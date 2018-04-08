const readline      = require('readline');
const SerialPort    = require('serialport');
const chalk         = require('chalk');

const device = process.env.DEVICE;

// --- init ---
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'servo angle > '
});

const sp = new SerialPort(device, {baudRate: 9600}, onError);


// device path check
if (!device) {
    console.log('Please define a device with "DEVICE="');
} else {
    // console.log('YAY! You have entered a device: ' + chalk.green(`${device}`));
    console.log(`Device ${chalk.green(device)} is connected. `);

    rl.prompt();
}

// --- readline events ---
rl.on('line', (line) => {
    switch (line) {
        case 'quit':
            program_exit();
            break;
        default:
            console.log('Servo angle set: ' + line);
            sp.write(line + ';', onError);
            break;
    }
    rl.prompt();
});
rl.on('close', () => {
    program_exit();
});


// --- serial port events ---
sp.on('data', (data) => {
    console.log('incoming serial data: ' + data);
});



// --- helper functions ---
function program_exit() {
    console.log(chalk.yellow('Goodbye!'));
    process.exit(0);
}

function onError(err) {
    console.log(`Error occurred: ${chalk.red(err)}`);
    process.exit(1);
}
