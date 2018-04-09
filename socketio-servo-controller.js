const app           = require('express')();
const express       = require('express');
const http          = require('http').Server(app);
const io            = require('socket.io')(http);
const chalk         = require('chalk');
const clear         = require('clear');

const SerialPort    = require('serialport');

const sp = new SerialPort('/dev/cu.usbmodem1411', {baudRate: 9600}, (err) => {
    if (err) {
        console.log('Error: ' + err);
    }
});

// sockets
io.on('connection', (socket) => {
    console.log(`A user with the id ${chalk.blue(socket.id)} has connected.`);

    socket.on('disconnect', () => {
        console.log(`User ${chalk.red(socket.id)} disconnected.`);
    });
    socket.on('_ping', (data) => {
        io.emit('_pong', 'ponged!');
    });
    socket.on('room', (room) => {
        socket.join(room);
        console.log(`${chalk.blue(socket.id)} joined room ${chalk.green(room)}`);
        io.sockets.in(room).emit('message', `Welcome ${socket.id} to the room!`);
    });

    // --- servo related socket events ---
    socket.on('servo1 check', (data) => {

    });

    socket.on('servo1', (data) => {
        console.log(`set servo to ${data}`);
        update_servo(sp, data);
    });
});

// Serial Port
const api_router = express.Router();


// ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/servo_control_panel.html');
});

// --- API routes ---
api_router.get('/', (req,res) => {
    res.send('API route working!');
});

api_router.get('/serialports', (req,res) => {
    SerialPort.list().then((ports) => {
        res.json(ports);
    });
});

app.use('/api', api_router);

// --- static files ---
app.use(express.static('public/'));


// --- start server ---
http.listen(3000, () => {
    clear();
    console.log(`Listening on localhost:3000`);
});



// -----------------
// --- FUNCTIONS ---
// -----------------
function update_servo(port, angle) {
    port.write(angle+';', (err) => {
        if(err) {
            return console.log('Error on write: ' + err.message);
        }
        console.log('message written out. ');
    });
}