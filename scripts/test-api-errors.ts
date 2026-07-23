import assert from 'node:assert/strict';
import {
  buildSignupErrorFromPayload,
  extractApiError,
  extractRedirectLinkFromText,
  extractSignupLink,
  isSignupRedirectLink,
  isSignupSuccessPayload,
  normalizeSignupLink,
  sanitizeTechnicalMessage,
} from '../src/lib/api-errors';

// Laravel validation — pass through API message as-is
const laravel = extractApiError({
  message: 'The given data was invalid.',
  errors: {
    email: ['The email has already been taken.'],
  },
});
assert.equal(laravel.fieldErrors.email, 'The email has already been taken.');
assert.equal(laravel.message, 'The email has already been taken.');

const laravelShown = sanitizeTechnicalMessage('The email has already been taken.', 'gn');
assert.equal(laravelShown, 'The email has already been taken.');

// SQL duplicate email — localized (technical leak hidden)
const sqlEmail = sanitizeTechnicalMessage(
  "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'test@example.com' for key 'users_email_unique'",
  'gn'
);
assert.ok(sqlEmail.includes('déjà enregistré'), sqlEmail);

// SMTP mailbox does not exist — NOT duplicate email
const smtpError =
  'Expected response code "250/251/252" but got code "550", with message "550 5.4.6 An email sent to this address has been rejected with the reason \'Mailbox does not exist\' within the last 30 days. Check for typos in the email"';

const smtpShown = sanitizeTechnicalMessage(smtpError, 'gn');
assert.ok(smtpShown.includes('boîte mail') || smtpShown.includes('invalide'), smtpShown);
assert.ok(!smtpShown.includes('déjà enregistré'), `Should not be duplicate: ${smtpShown}`);

const smtpPayload = buildSignupErrorFromPayload({ error: smtpError }, 'ci', 500);
assert.ok(smtpPayload.message.includes('boîte mail') || smtpPayload.message.includes('invalide'));
assert.ok(!smtpPayload.message.includes('déjà enregistré'));

// API French validation — pass through
const frValidation = sanitizeTechnicalMessage('Cet email est déjà utilisé.', 'ci');
assert.equal(frValidation, 'Cet email est déjà utilisé.');

// Nested message JSON
const nested = extractApiError({
  message: JSON.stringify({ email: ['Email already registered'] }),
});
assert.equal(nested.fieldErrors.email, 'Email already registered');

// Deep nested data — pass through readable API text
const deep = extractApiError({
  data: {
    success: false,
    error: {
      message: 'Company subdomain already exists',
    },
  },
});
assert.ok(deep.message?.includes('subdomain'));

const apiSuccessPayload = {
  type: 'success',
  message:
    'thank you for signing up! feel free to complete your company setup at your convenience.',
  data: {
    link: 'localhost/api/app/getting-started/eyJpdiI6ImFZZXdtSFdwTHlZMVRmenloRmpWYnc9PSIsInZhbHVlIjoib0dFT2pCTGZNa3dPanRxMjdjeGUzUT09',
  },
  success: true,
};

const fromStructured = extractSignupLink(apiSuccessPayload);
assert.equal(
  fromStructured,
  'localhost/api/app/getting-started/eyJpdiI6ImFZZXdtSFdwTHlZMVRmenloRmpWYnc9PSIsInZhbHVlIjoib0dFT2pCTGZNa3dPanRxMjdjeGUzUT09'
);

const fromJsonString = extractSignupLink(JSON.stringify(apiSuccessPayload));
assert.equal(fromJsonString, fromStructured);

assert.equal(
  isSignupRedirectLink(JSON.stringify(apiSuccessPayload)),
  false,
  'full JSON response must not be treated as redirect link'
);

const normalizedApi = normalizeSignupLink(fromStructured!);
assert.equal(
  normalizedApi,
  'https://localhost/api/app/getting-started/eyJpdiI6ImFZZXdtSFdwTHlZMVRmenloRmpWYnc9PSIsInZhbHVlIjoib0dFT2pCTGZNa3dPanRxMjdjeGUzUT09'
);

const messageAsError = extractApiError(apiSuccessPayload);
assert.equal(messageAsError.message, undefined);

assert.ok(isSignupSuccessPayload(apiSuccessPayload));

// Success payload — link must not be treated as an error
const successPayload = extractApiError({
  success: true,
  data: {
    link: 'localhost/api/app/getting-started/eyJpdiI6IkZENkVCYjNkYVJidWdzN3o5RkFiNmc9PSIsInZhbHVlIjoiNTdxQmRORVhVNVlaSWtZV1ZNbVZyQT09',
  },
});
assert.equal(successPayload.message, undefined);
assert.equal(Object.keys(successPayload.fieldErrors).length, 0);

// API returns redirect URL in message field (common Laravel pattern)
const messageLink = extractSignupLink({
  success: true,
  message: 'localhost/api/app/getting-started/eyJpdiI6IjdQR0s5dTQvTjRMb2hEcDEwRGJod1E9PSIsInZhbHVlIjoidEFCUk9JYVRBQmdWSEY4dzgyUzJoZz09',
});
assert.ok(messageLink?.includes('getting-started'), messageLink);

const embeddedMessageLink = extractRedirectLinkFromText(
  'Setup complete at localhost/api/app/getting-started/token123 today'
);
assert.equal(embeddedMessageLink, 'localhost/api/app/getting-started/token123');

const messageAsError2 = extractApiError({
  success: true,
  message:
    'localhost/api/app/getting-started/eyJpdiI6IjdQR0s5dTQvTjRMb2hEcDEwRGJod1E9PSIsInZhbHVlIjoidEFCUk9JYVRBQmdWSEY4dzgyUzJoZz09',
});
assert.equal(messageAsError2.message, undefined);

assert.ok(
  isSignupSuccessPayload({
    message:
      'localhost/api/app/getting-started/eyJpdiI6IjdQR0s5dTQvTjRMb2hEcDEwRGJod1E9PSIsInZhbHVlIjoidEFCUk9JYVRBQmdWSEY4dzgyUzJoZz09',
  })
);

assert.ok(
  isSignupRedirectLink(
    'localhost/api/app/getting-started/eyJpdiI6IjdQR0s5dTQvTjRMb2hEcDEwRGJod1E9PSIsInZhbHVlIjoidEFCUk9JYVRBQmdWSEY4dzgyUzJoZz09'
  )
);

const extractedLink = extractSignupLink({
  data: { link: 'app.zyvoerp.com/api/app/getting-started/token123' },
});
assert.equal(extractedLink, 'app.zyvoerp.com/api/app/getting-started/token123');

const plainStringLink = extractSignupLink(
  'localhost/api/app/getting-started/eyJpdiI6IjdQR0s5dTQvTjRMb2hEcDEwRGJod1E9PSIsInZhbHVlIjoidEFCUk9JYVRBQmdWSEY4dzgyUzJoZz09'
);
assert.ok(plainStringLink?.includes('getting-started'));

const normalized = normalizeSignupLink('app.zyvoerp.com/api/app/getting-started/token123');
assert.equal(normalized, 'https://app.zyvoerp.com/api/app/getting-started/token123');

const normalizedLocal = normalizeSignupLink(
  'localhost/api/app/getting-started/token123',
  'https://app.zyvoerp.com'
);
assert.equal(normalizedLocal, 'https://localhost/api/app/getting-started/token123');

console.log('All api-errors tests passed.');
