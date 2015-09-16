'use strict';

module.exports = function (io) {
  io.sockets.on('connection', function (client) {
    let newUser = require('./io-routes/new-user');
    let newMessage = require('./io-routes/new-message');
    let userLeft = require('./io-routes/user-left');

    client.on('room', newUser(io, client));
    client.on('new message', newMessage(client));
    client.on('disconnect', userLeft(client));
  });
};