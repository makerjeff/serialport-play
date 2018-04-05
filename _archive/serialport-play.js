const serialport        = require('serialport');
let portName            = process.argv[2] || null;





if (portName === null) {
    console.log('please specific a port name. ');
    process.exit(1);
} else {
    //TODO: check if port is valid.
    console.log(`Starting serialcomm on port: ${portName}`);

    let myPort = new serialport(portName, {baudRate:9600}, function(err) {
        if (err) {
            return console.log('Error: ', err.message);
        }
    });
    let Readline = serialport.parsers.Readline;
    var parser = new Readline();
    myPort.pipe(parser);
}