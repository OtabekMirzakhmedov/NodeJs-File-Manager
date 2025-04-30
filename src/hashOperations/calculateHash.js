import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export const calculateHash = async (filePath) => {
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

        const readStream = fs.createReadStream(resolvedPath);

        const hash = crypto.createHash('sha256');

        return new Promise((resolve, reject) => {
            readStream.on('error', (error) => {
                console.error('Operation failed:', error.message);
                reject(false);
            });

            readStream.on('data', (chunk) => {
                hash.update(chunk);
            });

            readStream.on('end', () => {
                const hashDigest = hash.digest('hex');
                console.log(`Hash for ${path.basename(resolvedPath)}: ${hashDigest}`);
                resolve(true);
            });
        });
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default calculateHash;