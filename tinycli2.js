// modules
const readline = require('readline');
const clear = require('clear');
const chalk = require('chalk');

// initialize
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.green('OHAI> ')
});


// start process
clear();

// initial prompt
rl.prompt();


// --- EVENTS ---
rl.on('line', (line) => {

    // check answer, moved
    evaluate(line);
});


// close event
rl.on('close', () => {
    console.log(chalk.yellow('Goodbye!'));
    process.exit(0);
});