import fs from 'fs';
import path from 'path';

export const readFile = async (filePath) => {
    try {
        const resolvedPath = path.resolve(process.cwd(), filePath);

        try {
            const stats = await fs.promises.stat(resolvedPath);
            if (!stats.isFile()) {
                console.error('Operation failed: Not a file');
                return false;
            }
        } catch (error) {
            console.error('Operation failed: File does not exist');
            return false;
        }

        const readStream = fs.createReadStream(resolvedPath, { encoding: 'utf8' });

        readStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        return new Promise((resolve, reject) => {
            readStream.on('error', (error) => {
                console.error('Operation failed:', error.message);
                reject(false);
            });

            readStream.on('end', () => {
                console.log('\n'); // Add a newline at the end for better formatting
                resolve(true);
            });
        });
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default readFile;