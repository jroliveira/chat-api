'use strict';

const
  express = require('express'),
  passport = require('passport'),
  flash = require('connect-flash'),
  mongoose = require('mongoose');

global.KEY = 'express.sid';
global.SECRET = 'express';

global.store = new express.session.MemoryStore();
global.cookie = express.cookieParser(SECRET);

module.exports = function (app) {
  app.use(cookie);
  app.use(express.session({
    secret: SECRET,
    key: KEY,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 24
    }
  }));

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded());

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use(app.router);
  app.use(function (err, req, res, next) {
    console.log(err.message);
    res.send(500);
  });
};