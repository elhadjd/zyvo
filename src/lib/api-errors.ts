import type { MarketCode } from '@/lib/markets/types';
import { getSignupFormCopy } from '@/data/markets/form-locale';

export interface ParsedSignupError {
  formMessage: string;
  fieldErrors: Record<string, string>;
}

export interface ExtractedApiError {
  message?: string;
  fieldErrors: Record<string, string>;
  rawMessages: string[];
}

const SQL_ERROR_PATTERN =
  /sqlstate|sql syntax|mysql|sqlite|postgresql|pdo exception|integrity constraint violation|foreign key constraint|unique constraint failed|column .+ cannot be null|table .+ doesn't exist|syntax error|queryexception|connection refused|general error:/i;

const FILE_PATH_PATTERN = /[A-Za-z]:\\|\/vendor\/|\.php['":\s]|SmtpTransport|symfony\\mailer/i;

/** Strict: DB unique violation on email */
const SQL_DUPLICATE_EMAIL_PATTERN =
  /duplicate entry '[^']*@[^']*'|for key ['"][^'"]*email|users?_email_unique|unique.*\bemail\b/i;

/** Strict: DB unique violation on company/subdomain */
const SQL_DUPLICATE_COMPANY_PATTERN =
  /duplicate entry '(?![^']*@)[^']*' for key ['"][^'"]*(company|subdomain|domain|slug)|for key ['"][^'"]*(company|subdomain)_/i;

const INVALID_MAILBOX_PATTERN =
  /mailbox does not exist|550 5\.4\.6|check for typos in the email/i;

const SMTP_DELIVERY_PATTERN =
  /expected response code ["']?250|smtp|mailer|mail transport|could not be sent/i;

const GENERIC_REQUEST_FAILED = /^request failed$/i;

const GENERIC_WRAPPER_MESSAGES =
  /the given data was invalid|validation failed|unprocessable entity|bad request|error occurred/i;

const SUCCESS_PAYLOAD_KEYS = new Set([
  'link',
  'url',
  'redirect',
  'redirect_url',
  'dashboard_url',
  'token',
  'access_token',
]);

const SIGNUP_REDIRECT_STRICT_PATTERN =
  /^(?:https?:\/\/)?(?:[a-z0-9][a-z0-9.-]*(?::\d+)?)?(?:\/api)?\/app\/getting-started\/[A-Za-z0-9+/=_-]+$/i;

const SIGNUP_REDIRECT_EXTRACT_PATTERN =
  /(?:https?:\/\/)?(?:[a-z0-9][a-z0-9.-]*(?::\d+)?)?(?:\/api)?\/app\/getting-started\/[A-Za-z0-9+/=_-]+/i;

export function isSignupRedirectLink(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith('{') || trimmed.startsWith('[')) return false;
  return SIGNUP_REDIRECT_STRICT_PATTERN.test(trimmed);
}

export function extractRedirectLinkFromText(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (isSignupRedirectLink(trimmed)) return trimmed;

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      return extractSignupLink(JSON.parse(trimmed));
    } catch {
      return undefined;
    }
  }

  const match = trimmed.match(SIGNUP_REDIRECT_EXTRACT_PATTERN);
  return match?.[0];
}

function isSqlLikeMessage(message: string): boolean {
  return SQL_ERROR_PATTERN.test(message);
}

function containsTechnicalLeak(message: string): boolean {
  return isSqlLikeMessage(message) || FILE_PATH_PATTERN.test(message);
}

function extractReadableCore(message: string): string {
  let text = message.trim();

  const smtpInner = text.match(/with message "([^"]+)"/i);
  if (smtpInner?.[1]) text = smtpInner[1];

  const reason = text.match(/reason ['"]([^'"]+)['"]/i);
  if (reason?.[1] && text.length > 120) text = reason[1];

  text = text.replace(/[A-Za-z]:\\[^\s'"]+/g, ' ');
  text = text.replace(/\s*'file'\s*=>\s*'[^']+'/gi, ' ');
  text = text.replace(/\s*'line'\s*=>\s*\d+/gi, ' ');
  text = text.replace(/\/{1,2}[^\s'"]+\.php/gi, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

function isInvalidMailboxError(message: string): boolean {
  return INVALID_MAILBOX_PATTERN.test(message);
}

function isSmtpDeliveryError(message: string): boolean {
  return SMTP_DELIVERY_PATTERN.test(message);
}

function isSqlDuplicateEmail(message: string): boolean {
  return SQL_DUPLICATE_EMAIL_PATTERN.test(message);
}

function isSqlDuplicateCompany(message: string): boolean {
  return SQL_DUPLICATE_COMPANY_PATTERN.test(message);
}

/**
 * Map API/server text to a user-facing message.
 * - Readable API validation text → pass through unchanged
 * - SQL / SMTP technical leaks → specific localized message per case
 * - Never guess "duplicate email" from loose keyword matching
 */
export function sanitizeTechnicalMessage(message: string, marketCode: MarketCode): string {
  const copy = getSignupFormCopy(marketCode);
  const trimmed = message.trim();
  if (!trimmed || GENERIC_REQUEST_FAILED.test(trimmed)) return copy.formError;

  const core = extractReadableCore(trimmed);

  if (isInvalidMailboxError(core) || isInvalidMailboxError(trimmed)) {
    return copy.invalidMailbox;
  }

  if (containsTechnicalLeak(trimmed)) {
    if (isSqlDuplicateEmail(trimmed)) return copy.duplicateEmail;
    if (isSqlDuplicateCompany(trimmed)) return copy.duplicateCompany;
    if (isSmtpDeliveryError(trimmed) || isSmtpDeliveryError(core)) {
      return isInvalidMailboxError(core) ? copy.invalidMailbox : copy.emailDeliveryFailed;
    }
    return copy.technicalError;
  }

  if (isSmtpDeliveryError(core)) {
    return isInvalidMailboxError(core) ? copy.invalidMailbox : copy.emailDeliveryFailed;
  }

  return core || trimmed;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function firstString(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (Array.isArray(value)) {
    for (const item of value) {
      const nested = firstString(item);
      if (nested) return nested;
    }
  }
  return undefined;
}

function mapFieldName(field: string): string {
  const normalized = field.toLowerCase();
  if (normalized === 'name' || normalized === 'company_name' || normalized === 'company') return 'name';
  if (normalized.includes('email') || normalized === 'work_email') return 'email';
  if (normalized === 'nif' || normalized === 'tax_id') return 'nif';
  return field;
}

function tryParseJsonMessage(message: string): unknown {
  const trimmed = message.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}

function collectValidationErrors(
  errors: Record<string, unknown>,
  target: Record<string, string>
): void {
  for (const [field, value] of Object.entries(errors)) {
    const message = firstString(value);
    if (!message) continue;
    target[mapFieldName(field)] = message;
  }
}

function walkPayloadForErrors(
  value: unknown,
  fieldErrors: Record<string, string>,
  rawMessages: string[],
  depth = 0
): void {
  if (depth > 6 || value == null) return;

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed && !isSignupRedirectLink(trimmed)) {
      rawMessages.push(trimmed);
    }

    const parsed = tryParseJsonMessage(trimmed);
    if (parsed) {
      walkPayloadForErrors(parsed, fieldErrors, rawMessages, depth + 1);
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      walkPayloadForErrors(item, fieldErrors, rawMessages, depth + 1);
    }
    return;
  }

  const record = asRecord(value);
  if (!record) return;

  const validation = asRecord(record.errors);
  if (validation) collectValidationErrors(validation, fieldErrors);

  const looksLikeFieldErrors = Object.entries(record).every(([key, val]) => {
    if (
      ['message', 'error', 'data', 'success', 'status', 'code'].includes(key) ||
      SUCCESS_PAYLOAD_KEYS.has(key)
    ) {
      return false;
    }
    return typeof val === 'string' || (Array.isArray(val) && val.every((item) => typeof item === 'string'));
  });
  if (looksLikeFieldErrors && Object.keys(record).length > 0 && !record.errors) {
    collectValidationErrors(record, fieldErrors);
  }

  for (const key of ['message', 'error', 'msg', 'detail', 'description', 'reason']) {
    const text = firstString(record[key]);
    if (text && !isSignupRedirectLink(text)) {
      rawMessages.push(text);
    }

    const parsed = text ? tryParseJsonMessage(text) : null;
    if (parsed) walkPayloadForErrors(parsed, fieldErrors, rawMessages, depth + 1);
  }

  for (const key of ['data', 'error', 'response', 'result', 'body']) {
    if (record[key] != null) {
      walkPayloadForErrors(record[key], fieldErrors, rawMessages, depth + 1);
    }
  }
}

export function extractSignupLink(payload: unknown): string | undefined {
  if (typeof payload === 'string') {
    return extractRedirectLinkFromText(payload);
  }

  const record = asRecord(payload);
  if (!record) return undefined;

  const nested = record.data;
  const nestedRecord = asRecord(nested);

  const candidates = [
    nestedRecord?.link,
    nestedRecord?.url,
    nestedRecord?.redirect,
    nestedRecord?.redirect_url,
    nestedRecord?.dashboard_url,
    typeof nested === 'string' ? nested : undefined,
    record.link,
    record.url,
    record.redirect,
    record.redirect_url,
    record.dashboard_url,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      const extracted = extractRedirectLinkFromText(candidate);
      if (extracted) return extracted;
    }
  }

  for (const key of ['message', 'msg', 'result'] as const) {
    const text = record[key];
    if (typeof text === 'string' && text.trim()) {
      const extracted = extractRedirectLinkFromText(text);
      if (extracted) return extracted;
    }
  }

  return undefined;
}

export function isSignupSuccessPayload(payload: unknown): boolean {
  return Boolean(extractSignupLink(payload));
}

export function normalizeSignupLink(link: string, appBaseUrl = 'https://app.zyvoerp.com'): string {
  const extracted = extractRedirectLinkFromText(link) ?? link.trim();
  if (!extracted) return appBaseUrl;

  if (/^https?:\/\//i.test(extracted)) return extracted;

  if (extracted.startsWith('/')) {
    return `${appBaseUrl.replace(/\/$/, '')}${extracted}`;
  }

  return `https://${extracted}`;
}

export function extractApiError(payload: unknown): ExtractedApiError {
  if (isSignupSuccessPayload(payload)) {
    return { fieldErrors: {}, rawMessages: [] };
  }

  const fieldErrors: Record<string, string> = {};
  const rawMessages: string[] = [];

  walkPayloadForErrors(payload, fieldErrors, rawMessages);

  const uniqueMessages = [...new Set(rawMessages.map((m) => m.trim()).filter(Boolean))];
  const meaningful = uniqueMessages.filter(
    (m) => !GENERIC_REQUEST_FAILED.test(m) && !GENERIC_WRAPPER_MESSAGES.test(m)
  );

  const message =
    Object.values(fieldErrors)[0] ??
    meaningful[0] ??
    uniqueMessages.find((m) => !GENERIC_REQUEST_FAILED.test(m)) ??
    uniqueMessages[0];

  return {
    message,
    fieldErrors,
    rawMessages: uniqueMessages,
  };
}

export function buildSignupErrorFromPayload(
  payload: unknown,
  marketCode: MarketCode,
  status = 400
): ApiRequestError {
  const extracted = extractApiError(payload);
  const copy = getSignupFormCopy(marketCode);

  const fieldErrors: Record<string, string> = {};
  for (const [field, value] of Object.entries(extracted.fieldErrors)) {
    fieldErrors[field] = sanitizeTechnicalMessage(value, marketCode);
  }

  const primaryRaw =
    extracted.message ??
    Object.values(extracted.fieldErrors)[0] ??
    extracted.rawMessages[0];

  const formMessage = primaryRaw
    ? sanitizeTechnicalMessage(primaryRaw, marketCode)
    : status >= 500
      ? copy.technicalError
      : copy.formError;

  return new ApiRequestError(formMessage, status, payload, fieldErrors);
}

export function sanitizeApiPayloadForClient(
  payload: unknown,
  marketCode: MarketCode = 'us'
): Record<string, unknown> {
  if (isSignupSuccessPayload(payload)) {
    const record = asRecord(payload);
    return record ? { ...record, success: true } : { success: true };
  }

  const record = asRecord(payload);
  if (!record) {
    return { success: false, message: getSignupFormCopy(marketCode).formError };
  }

  const extracted = extractApiError(record);
  const next: Record<string, unknown> = { ...record, success: false };

  const primary =
    extracted.message ??
    Object.values(extracted.fieldErrors)[0] ??
    extracted.rawMessages[0];

  if (primary) {
    next.message = sanitizeTechnicalMessage(primary, marketCode);
  } else {
    next.message = getSignupFormCopy(marketCode).formError;
  }

  if (Object.keys(extracted.fieldErrors).length > 0) {
    const sanitizedErrors: Record<string, string> = {};
    for (const [field, value] of Object.entries(extracted.fieldErrors)) {
      sanitizedErrors[mapFieldName(field)] = sanitizeTechnicalMessage(value, marketCode);
    }
    next.errors = sanitizedErrors;
  }

  return next;
}

export function parseSignupApiError(
  error: unknown,
  marketCode: MarketCode
): ParsedSignupError {
  const copy = getSignupFormCopy(marketCode);

  if (error instanceof ApiRequestError) {
    const signupLink = extractSignupLink(error.data);
    if (signupLink) {
      return { formMessage: '', fieldErrors: {} };
    }

    const fromPayload = extractApiError(error.data);
    const fieldErrors: Record<string, string> = { ...error.fieldErrors };

    for (const [field, value] of Object.entries(fromPayload.fieldErrors)) {
      const mapped = mapFieldName(field);
      fieldErrors[mapped] = sanitizeTechnicalMessage(value, marketCode);
    }

    for (const [field, value] of Object.entries(fieldErrors)) {
      fieldErrors[field] = sanitizeTechnicalMessage(value, marketCode);
    }

    const primary =
      fromPayload.message ??
      Object.values(fromPayload.fieldErrors)[0] ??
      fromPayload.rawMessages[0] ??
      error.message;

    const formMessage = sanitizeTechnicalMessage(primary, marketCode);

    return {
      formMessage: fieldErrors.email ?? fieldErrors.name ?? formMessage,
      fieldErrors,
    };
  }

  if (error instanceof Error && error.message && !GENERIC_REQUEST_FAILED.test(error.message)) {
    return {
      formMessage: sanitizeTechnicalMessage(error.message, marketCode),
      fieldErrors: {},
    };
  }

  return {
    formMessage: copy.formError,
    fieldErrors: {},
  };
}

export class ApiRequestError extends Error {
  status: number;
  data: unknown;
  fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number,
    data?: unknown,
    fieldErrors: Record<string, string> = {}
  ) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.data = data;
    this.fieldErrors = fieldErrors;
  }
}
