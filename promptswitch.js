// TODO: play with prompts here.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'HOLA!> '
});

let current_mode = 'basic';

rl.prompt();

rl.on('line', (line) => {
    switch(line.trim()) {
        case 'hello':
            console.log('world!');
            break;

        case 'servo':
            console.log('switching prompts...');
            switch_mode('servo');
            break;

        case 'quit':
            console.log('goodbye!');
            process.exit(0);
            break;

        default:
            console.log(`What joo say? ${line.trim()}?`);
    }

    rl.prompt();
});


// --- helper functions ---

function switch_mode(mode) {

    if (current_mode !== mode) {
        switch (mode) {
            case 'basic':
                rl.setPrompt('OHAI> ');
                // TODO: set current state to basic.
                current_mode = 'basic';
                break;

            case 'servo':
                rl.setPrompt('servo >');
                // TODO: set current state to servo.
                current_mode = 'servo';
                break;

            default:
                console.log('unknown mode. setting to basic. ');
                rl.setPrompt('OHAI >');
                break;
        }
    } else {
        console.log('mode switch ignored. mode is already set.');
    }
}