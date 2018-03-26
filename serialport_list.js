const serialport = require('serialport');

// list ports
serialport.list(function(err, ports) {
    if (err) {
        console.error(err);
    } else {
        ports.forEach(function(port) {
            console.log(port.comName);
        });
    }
});