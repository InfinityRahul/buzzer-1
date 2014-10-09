var socket = io(location.host + ':3000');
var body = $('body');
var clicked = false, acknowledged = false;
$(document).on('vclick keydown', function () {
	if (!clicked) {
		clicked = true;
		socket.emit('buzz', {}, function (response) {
			if (response === 'acknowledged') {
				acknowledged = true;
				body.css('background-color', 'green');
			}
		});
	}
	return false;
});
socket.on('activate', function() {
	clicked = false;
	acknowledged = false;
	body.css('background-color', 'white');
});
socket.on('deactivate', function() {
	if (!acknowledged) {
		body.css('background-color', 'red');
	}
});
