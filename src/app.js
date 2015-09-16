'use strict';

const
  express = require('express'),
  app = express();

require('./configs/app')(app);

const
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

require('./configs/socket')(io);
require('./io-router')(io);

require('./configs/mongoose')();

require('./configs/passport')();

require('./router')(app);

let port = process.env.PORT || 4001;
server.listen(port, function () {
  console.log("Listening on " + port);
});