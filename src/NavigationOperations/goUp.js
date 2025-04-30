import path from 'path';

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
