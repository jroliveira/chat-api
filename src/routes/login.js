'use strict';

const
  passport = require('passport');

exports.post = function (req, res, next) {
  passport.authenticate('local-login', auth)(req, res, next);

  function auth(err, user, info) {
    let response = {
      success: false,
      message: null,
      type: null
    }

    if (err) {
      return next(err);
    }

    let message = req.flash('loginMessage');
    if (message.length !== 0) {
      response.message = message[0].message;
      response.type = message[0].type;
    }

    if (!user) {
      return res.json(response);
    }

    req.logIn(user, logIn);

    function logIn(err) {
      if (err) {
        return next(err);
      }

      response.success = true;
      return res.json(response);
    }
  }
};