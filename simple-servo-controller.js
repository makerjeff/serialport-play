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

const sp = new SerialPort(device, {baudRate: 9600}, function(err) {
    if(err) {
        console.log(`Error occurred: ${chalk.red(err)}`);
        process.exit(1);
    }
});

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
            break;
    }
    rl.prompt();
});

rl.on('close', () => {
    program_exit();
});

// --- initialize ---
function init() {

}

function evaluate() {

}

// --- helper functions ---
function program_exit() {
    console.log(chalk.yellow('Goodbye!'));
    process.exit(0);
}
