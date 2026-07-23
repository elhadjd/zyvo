import assert from 'node:assert/strict';
import {
  buildSignupErrorFromPayload,
  extractApiError,
  sanitizeTechnicalMessage,
} from '../src/lib/api-errors';

// Laravel validation
const laravel = extractApiError({
  message: 'The given data was invalid.',
  errors: {
    email: ['The email has already been taken.'],
  },
});
assert.equal(laravel.fieldErrors.email, 'The email has already been taken.');
assert.equal(laravel.message, 'The email has already been taken.');

// SQL duplicate email
const sqlEmail = sanitizeTechnicalMessage(
  "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'test@example.com' for key 'users_email_unique'",
  'gn'
);
assert.ok(sqlEmail.includes('déjà') || sqlEmail.includes('email'), sqlEmail);

// Nested message JSON
const nested = extractApiError({
  message: JSON.stringify({ email: ['Email already registered'] }),
});
assert.equal(nested.fieldErrors.email, 'Email already registered');

// Only errors object, no message
const errorsOnly = buildSignupErrorFromPayload(
  { errors: { email: ['Cet email est déjà utilisé.'] } },
  'ci',
  422
);
assert.ok(errorsOnly.fieldErrors.email?.includes('déjà'));
assert.ok(errorsOnly.message.includes('déjà'));

// Deep nested data
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
