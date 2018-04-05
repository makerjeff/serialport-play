const readline      = require('readline');
const SerialPort    = require('serialport');

const device = process.env.DEVICE;

// device path check
if (!device) {
    console.log('Please define a device with "DEVICE="');
} else {
    console.log('YAY! You have entered a device: ' + device);
}

