const chalk = require('chalk');
const clear = require('clear');
const SerialPort = require('serialport');

let angle = process.argv[2] || 90;
let port = process.env.PORT;

const sp = new SerialPort('/dev/cu.usbmodem1411', {baudRate: 9600});

update_servo(sp, angle);

sp.on('data', function(data) {
    console.log('data: ' + data);
    sp.close();
});

sp.on('error', onError);


// --------------------------------------
// ---------- helper functions ----------
// --------------------------------------
function program_exit() {
    console.log(chalk.yellow('Goodbye!'));
    process.exit(0);
}

function onError(err) {
    if (err) {
        console.log(`Error occurred: ${chalk.red(err)}`);
        process.exit(1);
    }
}

function update_servo(port, angle) {
    port.write(angle+';', (err) => {
        if(err) {
            return console.log('Error on write: ' + err.message);
        }
        console.log('message written out. ');
    });
}
