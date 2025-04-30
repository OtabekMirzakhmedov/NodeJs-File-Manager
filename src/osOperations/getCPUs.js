import os from 'os';

export const getCPUs = async () => {
    try {
        const cpus = os.cpus();
        console.log(`Overall amount of CPUs: ${cpus.length}`);

        cpus.forEach((cpu, index) => {
            const speedGHz = cpu.speed / 1000;
            console.log(`CPU ${index + 1}: ${cpu.model} (${speedGHz.toFixed(2)} GHz)`);
        });

        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

export default getCPUs;