'use strict';

const
  passport = require('passport'),
  Account = require('./../models/account');

exports.post = function (req, res) {
  let model = req.body;
  let where = {
    'email': model.email
  };

  Account.findOne(where, findCallback);

  function findCallback(err, account) {
    let response = {
      success: false,
      message: '',
      type: 'alert-danger'
    };

    if (err) {
      response.message = 'Erro ao buscar o e-mail.';
      return res.json(response);
    }

    if (account) {
      response.message = 'Este e-mail já esta cadastrado';
      return res.json(response);
    }

    let newAccount = new Account();

    if (!newAccount.validEmail(model.email)) {
      response.message = 'O e-mail não é válido';
      return res.json(response);
    }

    if (model.password !== model.confirmPassword) {
      response.message = 'A confirmação da senha não é igual a senha';
      return res.json(response);
    }

    newAccount.email = model.email;
    newAccount.password = newAccount.generateHash(model.password);
    newAccount.save(saveCallback);

    function saveCallback(err) {
      if (err) {
        throw err;
      }

      response.success = true;
      response.message = 'Conta criada com sucesso';
      response.type = 'alert-success';

      return res.json(response);
    }
  }
};