'use strict';

const
  signup = require('./routes/signup'),
	login = require('./routes/login'),
	logout = require('./routes/logout');

module.exports = function (app) {
  app.post('/sair', logout.post);
  app.post('/entrar', login.post);
  app.post('/criar-conta', signup.post);
};