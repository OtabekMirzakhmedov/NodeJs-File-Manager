import fs from 'fs';
import path from 'path';

export const deleteFile = async (filePath) => {
    try {
        const resolvedPath = path.resolve(process.cwd(), filePath);

        try {
            const stats = await fs.promises.stat(resolvedPath);
            if (!stats.isFile()) {
                console.error('Operation failed: Not a file');
                return false;
            }
        } catch {
            console.error('Operation failed: File does not exist');
            return false;
        }

        await fs.promises.unlink(resolvedPath);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default deleteFile;