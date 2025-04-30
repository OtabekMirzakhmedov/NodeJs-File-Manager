import os from 'os';

export const getHomeDir = async () => {
    try {
        const homeDir = os.homedir();
        console.log(`Home directory: ${homeDir}`);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default getHomeDir;