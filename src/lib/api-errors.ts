import type { MarketCode } from '@/lib/markets/types';
import { getSignupFormCopy } from '@/data/markets/form-locale';

export interface ParsedSignupError {
  formMessage: string;
  fieldErrors: Record<string, string>;
}

const SQL_ERROR_PATTERN =
  /sqlstate|sql syntax|mysql|sqlite|postgresql|pdo exception|integrity constraint|duplicate entry|foreign key constraint|unique constraint|column .+ cannot be null|table .+ doesn't exist|syntax error|queryexception|connection refused/i;

const DUPLICATE_EMAIL_PATTERN =
  /duplicate.*(email|e-mail|mail)|email.*(already|exist|taken|unique|duplicat)/i;

const DUPLICATE_COMPANY_PATTERN =
  /duplicate.*(company|entreprise|name|nome|nif|rccm|subdomain|domain|link)|company.*(already|exist|taken|unique)/i;

function isSqlLikeMessage(message: string): boolean {
  return SQL_ERROR_PATTERN.test(message);
}

function mapDuplicateMessage(message: string, marketCode: MarketCode): string | null {
  const copy = getSignupFormCopy(marketCode);
  if (DUPLICATE_EMAIL_PATTERN.test(message)) return copy.duplicateEmail;
  if (DUPLICATE_COMPANY_PATTERN.test(message)) return copy.duplicateCompany;
  return null;
}

function sanitizeTechnicalMessage(message: string, marketCode: MarketCode): string {
  const copy = getSignupFormCopy(marketCode);
  const trimmed = message.trim();
  if (!trimmed) return copy.formError;

  const duplicate = mapDuplicateMessage(trimmed, marketCode);
  if (duplicate) return duplicate;

  if (isSqlLikeMessage(trimmed)) return copy.technicalError;

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
    const first = value.find((item) => typeof item === 'string' && item.trim());
    return typeof first === 'string' ? first.trim() : undefined;
  }
  return undefined;
}

function mapFieldName(field: string): string {
  if (field === 'name' || field === 'company_name') return 'name';
  if (field === 'email' || field === 'work_email') return 'email';
  if (field === 'nif' || field === 'tax_id') return 'nif';
  return field;
}

function extractFieldErrors(
  errors: Record<string, unknown>,
  marketCode: MarketCode
): Record<string, string> {
  const mapped: Record<string, string> = {};
  for (const [field, value] of Object.entries(errors)) {
    const message = firstString(value);
    if (!message) continue;
    mapped[mapFieldName(field)] = sanitizeTechnicalMessage(message, marketCode);
  }
  return mapped;
}

function extractMessageFromPayload(payload: Record<string, unknown>): string | undefined {
  const direct = firstString(payload.message) ?? firstString(payload.error);
  if (direct) return direct;

  const data = asRecord(payload.data);
  if (data) {
    return firstString(data.message) ?? firstString(data.error);
  }

  return undefined;
}

export function sanitizeApiPayloadForClient(
  payload: unknown,
  marketCode: MarketCode = 'us'
): Record<string, unknown> {
  const record = asRecord(payload);
  if (!record) {
    return { success: false, message: getSignupFormCopy(marketCode).formError };
  }

  const next: Record<string, unknown> = { ...record };
  const message = extractMessageFromPayload(record);
  if (message) {
    next.message = sanitizeTechnicalMessage(message, marketCode);
  }

  const errors = asRecord(record.errors);
  if (errors) {
    next.errors = extractFieldErrors(errors, marketCode);
  }

  return next;
}

export function parseSignupApiError(
  error: unknown,
  marketCode: MarketCode
): ParsedSignupError {
  const copy = getSignupFormCopy(marketCode);
  const fieldErrors: Record<string, string> = {};

  if (error instanceof ApiRequestError) {
    for (const [field, value] of Object.entries(error.fieldErrors)) {
      fieldErrors[mapFieldName(field)] = sanitizeTechnicalMessage(value, marketCode);
    }

    const sanitized = sanitizeTechnicalMessage(error.message, marketCode);
    const payload = asRecord(error.data);
    if (payload) {
      const validation = asRecord(payload.errors);
      if (validation) {
        Object.assign(fieldErrors, extractFieldErrors(validation, marketCode));
      }
    }

    const firstField = Object.values(fieldErrors)[0];
    return {
      formMessage: firstField ?? sanitized ?? copy.formError,
      fieldErrors,
    };
  }

  const apiError = error as {
    response?: { data?: unknown; status?: number };
    status?: number;
    data?: unknown;
    fieldErrors?: Record<string, string>;
    message?: string;
  };

  const payload =
    asRecord(apiError.response?.data) ??
    asRecord(apiError.data) ??
    null;

  if (payload) {
    const validation = asRecord(payload.errors);
    if (validation) {
      Object.assign(fieldErrors, extractFieldErrors(validation, marketCode));
    }

    const message = extractMessageFromPayload(payload);
    if (message) {
      const sanitized = sanitizeTechnicalMessage(message, marketCode);
      if (!fieldErrors.form) {
        return { formMessage: sanitized, fieldErrors };
      }
    }
  }

  if (apiError.fieldErrors) {
    for (const [field, value] of Object.entries(apiError.fieldErrors)) {
      fieldErrors[mapFieldName(field)] = sanitizeTechnicalMessage(value, marketCode);
    }
  }

  const status = apiError.response?.status ?? apiError.status;
  if (status === 401 || status === 403) {
    return { formMessage: copy.serverUnavailable, fieldErrors };
  }
  if (status && status >= 500) {
    return { formMessage: copy.technicalError, fieldErrors };
  }

  const rawMessage = apiError.message;
  if (rawMessage && !rawMessage.toLowerCase().includes('request failed')) {
    return {
      formMessage: sanitizeTechnicalMessage(rawMessage, marketCode),
      fieldErrors,
    };
  }

  const firstField = Object.values(fieldErrors)[0];
  return {
    formMessage: firstField ?? copy.formError,
    fieldErrors,
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
