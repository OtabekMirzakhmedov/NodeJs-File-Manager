import { createInterface } from 'readline';
import { homedir } from 'os';
import { chdir } from 'process';
import {changeDirectory, goUp, listDirectory} from "./src/NavigationOperations/index.js";

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

rl.on('line', (line) => {
    const input = line.trim();

    const [command, ...args] = input.split(' ');
    const argument = args.join(' '); // Rejoin in case path has spaces

    try {
        switch (command) {
            case '.exit':
                console.log(`Thank you for using File Manager, ${username}, goodbye!`);
                process.exit();
                break;

            case 'up':
                goUp();
                break;

            case 'cd':
                if (!argument) {
                    console.log('Invalid input');
                    break;
                }
                changeDirectory(argument);
                break;

            case 'ls':
                listDirectory();
                break;


            default:
                console.log('Invalid input');
                break;
        }
    } catch (error) {
        console.log('Operation failed');
    }

    console.log(`You are currently in ${process.cwd()}`);

    rl.prompt();
});