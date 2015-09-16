'use strict';

module.exports = function (io, client) {
  return function (room) {
    if (client.room) {
      client.leave(client.room.current);
    }

    client.room = room;
    client.user = client.handshake.session.user.email;
    client.join(client.room.current);

    connected(client);
    client.in(client.room.current).broadcast.emit('new user', {
      msg: 'entrou',
      date: new Date(),
      user: client.user,
      room: client.room.current
    });

    function connected(client) {
      let result = [];

      let rooms = Object.keys(io.sockets.manager.rooms);
      for (let i = 0; i < rooms.length; i++) {
        let room = rooms[i].replace('/', '');
        let name = room;

        if (name == '') {
          name = 'default';
        }

        let newRoom = {
          name: name,
          clients: []
        };

        let users = io.sockets.clients(room);
        users.forEach(function (user) {
          newRoom.clients.push(user.user);
        });

        result.push(newRoom);

        if (i + 1 == rooms.length) {
          client.in(client.room.current).emit('connected', result);
        }
      }
    }
  }
};