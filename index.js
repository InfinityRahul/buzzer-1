var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var activated = false;
var timeoutId;

function deactivate() {
	activated = false;
	clearTimeout(timeoutId);
	io.emit('deactivate', {for: 'everyone'});
}

io.on('connection', function(socket) {
	socket.on('activate', function(data) {
		timeoutId = setTimeout(function() {
			deactivate();
		}, 1000 * data.timeout);
		activated = true;
		io.emit('activate', {for: 'everyone'});
	});
	socket.on('buzz', function(data, fn) {
		if (activated) {
			fn('acknowledged');
			deactivate();
		}
		else {
			fn('locked out');
		}
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});
