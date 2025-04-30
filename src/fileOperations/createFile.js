import fs from 'fs';
import path from 'path';

export const createFile = async (fileName) => {
    try {
        const filePath = path.join(process.cwd(), fileName);

        try {
            await fs.promises.access(filePath);
            console.error('Operation failed: File already exists');
            return false;
        } catch {
        }

        await fs.promises.writeFile(filePath, '');
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default createFile;