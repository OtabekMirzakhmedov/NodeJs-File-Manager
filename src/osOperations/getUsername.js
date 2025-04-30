import os from 'os';

export const getUsername = async () => {
    try {
        const username = os.userInfo().username;
        console.log(`System username: ${username}`);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default getUsername;