import os from 'os';

export const getArchitecture = async () => {
    try {
        const architecture = os.arch();
        console.log(`CPU architecture: ${architecture}`);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default getArchitecture;