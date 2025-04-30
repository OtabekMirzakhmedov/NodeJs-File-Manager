import path from 'path';
import fs from 'fs';

export const listDirectory = () => {
    try {
        const currentDir = process.cwd();
        const items = fs.readdirSync(currentDir);

        const folders = [];
        const files = [];

        for (const item of items) {
            const itemPath = path.join(currentDir, item);
            try {
                const stats = fs.statSync(itemPath);
                if (stats.isDirectory()) {
                    folders.push({ name: item, type: 'directory' });
                } else {
                    files.push({ name: item, type: 'file' });
                }
            } catch (error) {
            }
        }

        folders.sort((a, b) => a.name.localeCompare(b.name));
        files.sort((a, b) => a.name.localeCompare(b.name));

        const allItems = [...folders, ...files];

        if (allItems.length === 0) {
            console.log('Directory is empty');
            return true;
        }

        const maxNameLength = Math.max(...allItems.map(item => item.name.length));

        console.log('\nName'.padEnd(maxNameLength + 5) + 'Type');
        console.log('─'.repeat(maxNameLength + 15));

        for (const item of allItems) {
            console.log(`${item.name.padEnd(maxNameLength + 5)}${item.type}`);
        }

        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};
