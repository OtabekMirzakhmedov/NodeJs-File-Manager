import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

export const decompressFile = async (sourcePath, destinationPath) => {
    try {
        const resolvedSourcePath = path.resolve(process.cwd(), sourcePath);
        const resolvedDestPath = path.resolve(process.cwd(), destinationPath);

        try {
            const stats = await fs.promises.stat(resolvedSourcePath);
            if (!stats.isFile()) {
                console.error('Operation failed: Source is not a file');
                return false;
            }
        } catch (error) {
            console.error('Operation failed: Source file does not exist');
            return false;
        }

        const destDir = path.dirname(resolvedDestPath);
        try {
            const destStats = await fs.promises.stat(destDir);
            if (!destStats.isDirectory()) {
                console.error('Operation failed: Destination directory is not valid');
                return false;
            }
        } catch (error) {
            console.error('Operation failed: Destination directory does not exist');
            return false;
        }

        try {
            await fs.promises.access(resolvedDestPath);
            console.error('Operation failed: Destination file already exists');
            return false;
        } catch {
        }

        const readStream = fs.createReadStream(resolvedSourcePath);
        const writeStream = fs.createWriteStream(resolvedDestPath);

        const brotliDecompress = zlib.createBrotliDecompress();

        const pipeline = readStream.pipe(brotliDecompress).pipe(writeStream);

        return new Promise((resolve, reject) => {
            pipeline.on('error', (error) => {
                console.error('Decompression failed:', error.message);
                reject(false);
            });

            writeStream.on('finish', () => {
                console.log(`${path.basename(resolvedSourcePath)} was decompressed to ${path.basename(resolvedDestPath)}`);
                resolve(true);
            });
        });
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default decompressFile;