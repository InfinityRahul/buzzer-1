var socket = io(location.host + ':3000');
var audio = $('audio')[0];
var loaded = false;
var timer = $('#timer'), intervalId;
function activate(timeout) {
	socket.emit('activate', {timeout: timeout});
	timer.text(timeout.toString());
	intervalId = setInterval(function() {
		var cur = parseInt(timer.text())
		if (cur === 0) {
			clearInterval(intervalId);
			return;
		}
		timer.text((cur - 1).toString());
	}, 1000);
}
$('#tossup').click(function () {
	activate(7);
	return false;
});
$('#bonus').click(function () {
	activate(20);
	return false;
});
$('#incorrect').click(function () {
	activate(5);
	return false;
});
socket.on('activate', function () {
	$('button').prop('disabled', true);
});
socket.on('deactivate', function () {
	if (parseInt(timer.text()) !== 0) {
		audio.play();
	}
	$('button').prop('disabled', false);
	clearInterval(intervalId);
});

