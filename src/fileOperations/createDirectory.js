import fs from 'fs';
import path from 'path';

export const createDirectory = async (dirName) => {
    try {
        const dirPath = path.join(process.cwd(), dirName);

        try {
            await fs.promises.access(dirPath);
            console.error('Operation failed: Directory already exists');
            return false;
        } catch {
        }

        await fs.promises.mkdir(dirPath);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default createDirectory;