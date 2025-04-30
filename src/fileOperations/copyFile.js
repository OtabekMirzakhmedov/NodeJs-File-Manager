import fs from 'fs';
import path from 'path';

export const copyFile = async (sourcePath, destPath) => {
    try {
        const resolvedSourcePath = path.resolve(process.cwd(), sourcePath);

        let sourceStats;
        try {
            sourceStats = await fs.promises.stat(resolvedSourcePath);
            if (!sourceStats.isFile()) {
                console.error('Operation failed: Source is not a file');
                return false;
            }
        } catch {
            console.error('Operation failed: Source file does not exist');
            return false;
        }

        let resolvedDestPath = path.resolve(process.cwd(), destPath);

        try {
            const destStats = await fs.promises.stat(resolvedDestPath);

            if (destStats.isDirectory()) {
                const sourceFileName = path.basename(resolvedSourcePath);
                resolvedDestPath = path.join(resolvedDestPath, sourceFileName);

                try {
                    await fs.promises.access(resolvedDestPath);
                    console.error('Operation failed: File already exists in destination directory');
                    return false;
                } catch {
                }
            } else {
                console.error('Operation failed: Destination file already exists');
                return false;
            }
        } catch {
            const destDir = path.dirname(resolvedDestPath);
            try {
                await fs.promises.access(destDir);
            } catch {
                console.error('Operation failed: Destination directory does not exist');
                return false;
            }
        }

        const readStream = fs.createReadStream(resolvedSourcePath);
        const writeStream = fs.createWriteStream(resolvedDestPath);

        return new Promise((resolve, reject) => {
            readStream.on('error', (error) => {
                console.error('Read operation failed:', error.message);
                reject(false);
            });

            writeStream.on('error', (error) => {
                console.error('Write operation failed:', error.message);
                reject(false);
            });

            writeStream.on('finish', () => {
                resolve(true);
            });

            readStream.pipe(writeStream);
        });
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default copyFile;