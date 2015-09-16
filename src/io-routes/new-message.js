'use strict';

const
  Message = require('./../models/message');

module.exports = function (client) {
  return function (message) {
    var newMessage = new Message({
      id: message.id,
      message: message.msg,
      date: new Date().toString(),
      account: client.handshake.session.user._id
    });

    newMessage.save();

    client.in(client.room.current).emit('sent', {
      id: message.id,
      date: new Date(),
      key: message.key
    });

    client.in(client.room.current).broadcast.emit('new message', {
      msg: message.msg,
      date: new Date(),
      user: client.user
    });
  }
};