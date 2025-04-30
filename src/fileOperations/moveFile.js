import fs from 'fs';
import path from 'path';
import { copyFile } from './copyFile.js';

export const moveFile = async (sourcePath, destPath) => {
    try {
        const resolvedSourcePath = path.resolve(process.cwd(), sourcePath);

        const copyResult = await copyFile(sourcePath, destPath);

        if (!copyResult) {
            return false;
        }

        await fs.promises.unlink(resolvedSourcePath);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default moveFile;