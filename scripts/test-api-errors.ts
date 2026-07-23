import assert from 'node:assert/strict';
import {
  buildSignupErrorFromPayload,
  extractApiError,
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

console.log('All api-errors tests passed.');
