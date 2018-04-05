const chalk = require('chalk');
const clear = require('clear');
const SerialPort = require('serialport');


clear();

SerialPort.list().then(function(ports) {
    let index = 1;

    console.log('Ports available: ');

    ports.forEach((elem,ind,arr) => {
        console.log(chalk.yellow(`${index}. ${elem.comName}`));
        index++;
    });
});