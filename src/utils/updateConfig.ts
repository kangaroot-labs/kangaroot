import { promises as fs } from 'fs';
import path from 'path';
import { InvalidConfigError } from '../errors/InvalidConfigError';

const CONFIG_FILE_PATH = path.join(process.env.HOME || '', '.kangaroot.json');

/**
 * Updates the configuration file with the given key-value pair.
 * @param key - The configuration key to update.
 * @param value - The new value for the configuration key.
 */
export const updateConfig = async (key: string, value: string): Promise<void> => {
    try {
        const data = await fs.readFile(CONFIG_FILE_PATH, 'utf8');
        const config = JSON.parse(data);
        config[key] = value;
        await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
    } catch (err) {
        if (isNodeJsError(err) && err.code === 'ENOENT') {
            const config = { [key]: value };
            await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
        } else {
            throw new InvalidConfigError('Failed to update configuration');
        }
    }
};
