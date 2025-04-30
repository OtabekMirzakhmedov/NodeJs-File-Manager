import os from 'os';

export const getEOL = async () => {
    try {
        const eol = os.EOL;
        console.log(`Default system End-Of-Line: ${JSON.stringify(eol)}`);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default getEOL;