import path from 'path';
import fs from 'fs';

export const goUp = () => {
    try {
        const currentDir = process.cwd();
        const parentDir = path.dirname(currentDir);

        if (parentDir === currentDir) {
            return true;
        }

        process.chdir(parentDir);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export const changeDirectory = (targetPath) => {
    try {
        const resolvedPath = path.resolve(process.cwd(), targetPath);
        const stats = fs.statSync(resolvedPath);
        if (!stats.isDirectory()) {
            console.error('Operation failed: Not a directory');
            return false;
        }

        process.chdir(resolvedPath);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};