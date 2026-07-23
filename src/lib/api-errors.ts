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

const DUPLICATE_EMAIL_PATTERN =
  /duplicate entry.*@|for key ['"][^'"]*email|users?_email|email.*unique|the email has already been taken|email has already been taken|email.*(already|exist|taken|duplicat|registr)|e-?mail.*(déjà|existe|utilisé)|cet email/i;

const DUPLICATE_COMPANY_PATTERN =
  /duplicate entry(?!.*@)|for key ['"][^'"]*(company|subdomain|domain|slug|name)|company.*(already|exist|taken|unique)|entreprise.*(déjà|existe)|name has already been taken|subdomain.*(taken|exist)/i;

const GENERIC_REQUEST_FAILED = /^request failed$/i;

const GENERIC_WRAPPER_MESSAGES =
  /the given data was invalid|validation failed|unprocessable entity|bad request|error occurred/i;

function isSqlLikeMessage(message: string): boolean {
  return SQL_ERROR_PATTERN.test(message);
}

function mapKnownMessage(message: string, marketCode: MarketCode): string | null {
  const copy = getSignupFormCopy(marketCode);
  if (DUPLICATE_EMAIL_PATTERN.test(message)) return copy.duplicateEmail;
  if (DUPLICATE_COMPANY_PATTERN.test(message)) return copy.duplicateCompany;
  return null;
}

export function sanitizeTechnicalMessage(message: string, marketCode: MarketCode): string {
  const copy = getSignupFormCopy(marketCode);
  const trimmed = message.trim();
  if (!trimmed || GENERIC_REQUEST_FAILED.test(trimmed)) return copy.formError;

  const known = mapKnownMessage(trimmed, marketCode);
  if (known) return known;

  if (isSqlLikeMessage(trimmed)) {
    if (DUPLICATE_EMAIL_PATTERN.test(trimmed)) return copy.duplicateEmail;
    if (DUPLICATE_COMPANY_PATTERN.test(trimmed)) return copy.duplicateCompany;
    return copy.technicalError;
  }

  return trimmed;
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
    if (trimmed) rawMessages.push(trimmed);

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
    if (['message', 'error', 'data', 'success', 'status', 'code'].includes(key)) return false;
    return typeof val === 'string' || (Array.isArray(val) && val.every((item) => typeof item === 'string'));
  });
  if (looksLikeFieldErrors && Object.keys(record).length > 0 && !record.errors) {
    collectValidationErrors(record, fieldErrors);
  }

  for (const key of ['message', 'error', 'msg', 'detail', 'description', 'reason']) {
    const text = firstString(record[key]);
    if (text) rawMessages.push(text);

    const parsed = text ? tryParseJsonMessage(text) : null;
    if (parsed) walkPayloadForErrors(parsed, fieldErrors, rawMessages, depth + 1);
  }

  for (const key of ['data', 'error', 'response', 'result', 'body']) {
    if (record[key] != null) {
      walkPayloadForErrors(record[key], fieldErrors, rawMessages, depth + 1);
    }
  }
}

export function extractApiError(payload: unknown): ExtractedApiError {
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
