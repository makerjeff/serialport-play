const readline = require('readline');
var SerialPort = require('serialport');
var serialport = new SerialPort('/dev/cu.usbmodem1411', {baudRate: 9600});

var angle = process.env.ANGLE;

const rl = readline.createInterface({input: process.stdin, output: process.stdout});


    // rl.question('Angle?', (angle) => {
    //     serialport.write(angle + ';', function(err) {
    //         if (err) {
    //             return console.log('Error on write: ', err.message);
    //         }
    //     });
    //
    //     rl.close();
    // });

serialport.write(angle + ';', onError);

serialport.on('data', function(data) {
    console.log('data: ' + data);
});


// error handler
function onError(err) {
    console.log(err);
    process.exit(1);
}

