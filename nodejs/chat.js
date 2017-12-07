var socketIo = require('socket.io');
var usernames = [];
var messages = [];
function init (server) { 
	var io = socketIo.listen(server, {log:true, origins:'*:*'});
	io.set('origins', 'localhost:*');
	
	
	io.sockets.on('connection', function(socket){
		
		
		
		socket.on('join', function (username){
			 socket.username = username;
			 console.log(username.username);
    // add the client's username to the global list
			var user = username.username;
			usernames[user] = user;
			
			
			
			
			console.log(JSON.stringify(messages));
			
			
			console.log('Joined: ' + usernames[user]);
			
		});
		
		socket.on('getmessages', function()
		{
			socket.emit('initialize', messages);
		});
		
		
		socket.on('message', function (data){
			
				var user = data.username;
			console.log(data.username);
			console.log(usernames[user]);
				var user = data.username;
				var data = { message : data.message, username : usernames[user] };
				messages.push(data);
				console.log(data);
				socket.emit('message', data)
				socket.broadcast.emit('message', data);
				
console.log('Message: ' + data);
		
		});
		socket.on('disconnect', function (username) {
				
		});		
	});
}

exports.init = init;
