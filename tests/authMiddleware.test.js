const assert = require('node:assert/strict');
const express = require('express');
const session = require('express-session');
const request = require('supertest');
const authMiddleware = require('../middleware/authMiddleware');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: false,
}));

app.get('/public', (req, res) => res.send('public'));
app.get('/private', authMiddleware.isAuthenticated, (req, res) => res.send('private'));

app.post('/login', (req, res) => {
  req.session.user = { id: 1, username: 'admin', role: 'admin' };
  res.redirect('/private');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/public'));
});

(async () => {
  const unauthenticated = await request(app).get('/private');
  assert.equal(unauthenticated.status, 302);
  assert.equal(unauthenticated.headers.location, '/login');

  const agent = request.agent(app);
  const loginResponse = await agent.post('/login').type('form').send({ username: 'admin', password: '123' });
  assert.equal(loginResponse.status, 302);
  assert.equal(loginResponse.headers.location, '/private');

  const authenticated = await agent.get('/private');
  assert.equal(authenticated.status, 200);
  assert.equal(authenticated.text, 'private');

  const logoutResponse = await agent.get('/logout');
  assert.equal(logoutResponse.status, 302);
  assert.equal(logoutResponse.headers.location, '/public');

  console.log('auth middleware tests passed');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
