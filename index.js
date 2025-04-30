import { createInterface } from 'readline';
import { homedir } from 'os';
import { chdir } from 'process';
import {changeDirectory, goUp, listDirectory} from "./src/NavigationOperations/index.js";
import {
    copyFile,
    createDirectory,
    createFile,
    deleteFile,
    moveFile,
    readFile,
    renameFile
} from "./src/fileOperations/index.js";
import {getArchitecture, getCPUs, getEOL, getHomeDir, getUsername} from "./src/osOperations/index.js";
import {calculateHash} from "./src/hashOperations/index.js";

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

            case 'cat':
                if (!argument) {
                    console.log('Invalid input');
                    break;
                }
                await readFile(argument);
                break;

            case 'add':
                if (!argument) {
                    console.log('Invalid input');
                    break;
                }
                await createFile(argument);
                break;

            case 'mkdir':
                if (!argument) {
                    console.log('Invalid input');
                    break;
                }
                await createDirectory(argument);
                break;

            case 'rn':
                if (args.length < 2) {
                    console.log('Invalid input');
                    break;
                }
                const oldPath = args[0];
                const newName = args.slice(1).join(' ');
                await renameFile(oldPath, newName);
                break;

            case 'cp':
                if (args.length < 2) {
                    console.log('Invalid input');
                    break;
                }
                const sourcePath = args[0];
                const destPath = args.slice(1).join(' ');
                await copyFile(sourcePath, destPath);
                break;

            case 'mv':
                if (args.length < 2) {
                    console.log('Invalid input');
                    break;
                }
                const mvSourcePath = args[0];
                const mvDestPath = args.slice(1).join(' ');
                await moveFile(mvSourcePath, mvDestPath);
                break;

            case 'rm':
                if (!argument) {
                    console.log('Invalid input');
                    break;
                }
                await deleteFile(argument);
                break;

            case 'os':
                if (args.length === 0 || args[0] !== '--EOL' && args[0] !== '--cpus' &&
                    args[0] !== '--homedir' && args[0] !== '--username' && args[0] !== '--architecture') {
                    console.log('Invalid input');
                    break;
                }

                switch (args[0]) {
                    case '--EOL':
                        await getEOL();
                        break;
                    case '--cpus':
                        await getCPUs();
                        break;
                    case '--homedir':
                        await getHomeDir();
                        break;
                    case '--username':
                        await getUsername();
                        break;
                    case '--architecture':
                        await getArchitecture();
                        break;
                }
                break;

            case 'hash':
                if (!argument) {
                    console.log('Invalid input');
                    break;
                }
                await calculateHash(argument);
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