const test = require('node:test');
const assert = require('node:assert/strict');
const { isAuthenticated, authorize } = require('../middleware/auth');

test('isAuthenticated redirects to login when no active session exists', () => {
  const req = { session: {} };
  let redirectedTo = null;
  const res = {
    redirect: (path) => {
      redirectedTo = path;
    },
  };

  isAuthenticated(req, res, () => {
    throw new Error('next should not be called for unauthenticated requests');
  });

  assert.equal(redirectedTo, '/login');
});

test('authorize allows access for permitted roles', () => {
  const req = { session: { user: { role: 'admin' } } };
  let nextCalled = false;

  authorize(['admin'])(req, {}, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
});
