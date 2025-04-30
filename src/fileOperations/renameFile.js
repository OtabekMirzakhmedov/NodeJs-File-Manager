import fs from 'fs';
import path from 'path';

export const renameFile = async (oldPath, newName) => {
    try {
        const resolvedOldPath = path.resolve(process.cwd(), oldPath);

        try {
            await fs.promises.access(resolvedOldPath);
        } catch {
            console.error('Operation failed: Source file does not exist');
            return false;
        }

        const dirPath = path.dirname(resolvedOldPath);

        const newPath = path.join(dirPath, newName);

        try {
            await fs.promises.access(newPath);
            console.error('Operation failed: Destination already exists');
            return false;
        } catch {
        }

        await fs.promises.rename(resolvedOldPath, newPath);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default renameFile;