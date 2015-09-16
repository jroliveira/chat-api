﻿'use strict';

const
  passport = require('passport'),
  passportLocal = require('passport-local'),
  Account = require('./../models/account');

module.exports = function () {
  passport.serializeUser(function (account, done) {
    done(null, account.id);
  });

  passport.deserializeUser(function (id, done) {
    Account.findById(id, function (err, account) {
      done(err, account);
    });
  });

  passport.use('local-login', new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {
      Account.findOne({
        'email': email
      }, function (err, account) {
        if (err) {
          return done(err);
        }

        if (!account) {
          return done(null, false, req.flash('loginMessage', {
            message: 'E-mail ou senha inválida',
            type: 'alert-danger'
          }));
        }

        if (!account.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', {
            message: 'E-mail ou senha inválida',
            type: 'alert-danger'
          }));
        }

        req.session.user = account;

        return done(null, account);
      });
    }));
};