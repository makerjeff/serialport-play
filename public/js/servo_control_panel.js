var veil = document.getElementById('veil');
var slider = document.getElementById('slider');
var value_div = document.getElementById('value_div');

// --- servo ---;
var then = Date.now();
var interval = 10000;

// --- SOCKETS ---
var socket = io.connect();
var room = 'abc123';

socket.on('connect', function() {
    socket.emit('room', room);
});

socket.on('message', function(data) {
    console.log('Incoming message from server: ' + data);
    remove_veil();
});

// --- HTML events ---

window.addEventListener('load', function(e) {
    update_value_div(90);
    timed_pinger();

});

slider.addEventListener('change', function(e) {
    console.log('value has changed to ' + slider.value);
    update_value_div(slider.value);
    update_servo_position(slider.value);
});


// --- FUNCTIONS ---
function update_value_div(val) {
    value_div.innerHTML = val;
}

// TODO: create interval controlled servo send.
function update_servo_position(val) {
    socket.emit('servo1', val);
}

function remove_veil() {
    veil.style.display = 'none';
}


function timed_pinger() {

    var now = Date.now();

    if(then - now >= interval) {
        console.log('ping! value ' + (then - now));
        then = now;
        requestAnimationFrame(timed_pinger);
    }

}

