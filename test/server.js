var connect = require('connect');
var request = require('request');
var http = require('http');
var csp = require('../index');

var app = connect();
var _config = {directives: {
  'default-src': 'self',
  'img-src':     '*'
}};

app.use(csp.createCSP(_config));

app.use(function(req, resp) {
  resp.end('Hello');
});

var server = http.createServer(app);

exports.server = server;

if (!module.parent) {
  var port = 8080;
  server.listen(port, function() {
    console.log('listening on port %d', port);
  });
}
