const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI> '
});

rl.prompt();

rl.on('line', (line) => {
    switch(line.trim()) {
        case 'hello':
            console.log('world!');
            break;
        default:
            console.log(`What joo say? ${line.trim()}?`);
    }

    rl.prompt();    //prompt again within 'on'
});

rl.on('close', () => {
    // close event fires when you quit with "ctrl+c"
    console.log('Have a great day!');
    process.exit(0);
});