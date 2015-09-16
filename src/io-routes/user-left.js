'use strict';

module.exports = function (client) {
  return function () {
    client.broadcast.emit('user left', {
      msg: 'saiu',
      date: new Date(),
      user: client.user
    });
  }
};