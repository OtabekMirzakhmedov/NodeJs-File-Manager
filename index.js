import { createInterface } from 'readline';
import { homedir } from 'os';
import { chdir } from 'process';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';

console.log(`Welcome to the File Manager, ${username}!`);

try {
    chdir(homedir());
} catch (err) {
    console.error('Failed to change to home directory');
}

console.log(`You are currently in ${process.cwd()}`);

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit();
});

rl.prompt();

rl.on('line', async (line) => {
    const input = line.trim();

    if (input === '.exit') {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit();
    }

    console.log(`You are currently in ${process.cwd()}`);

    rl.prompt();
});