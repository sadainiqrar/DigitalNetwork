var http = require('http'),
	chat = require('./chat'),
	server,
	io,
	port = process.env.PORT || 3000;

var express = require('express');
var app = express();

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });	
	
server = http.createServer(app);
chat.init(server);

server.listen(port);
console.log('Node.js chat server listening @ ' + port);
