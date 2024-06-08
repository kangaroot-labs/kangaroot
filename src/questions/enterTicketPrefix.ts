import { promises as fs } from 'fs';
import path from 'path';
import readline from 'readline';
import { InvalidConfigError } from '../errors/InvalidConfigError';

const CONFIG_FILE_PATH = path.join(process.env.HOME || '', '.kangaroot.json');
const DEFAULT_TICKET_PREFIX = '#';

/**
 * Retrieves the ticket prefix from the configuration file or prompts the user to enter it if the file doesn't exist.
 * @returns {Promise<string>} The ticket prefix.
 */
export const enterTicketPrefix = async (): Promise<string> => {
    try {
        const data = await fs.readFile(CONFIG_FILE_PATH, 'utf8');
        const config = JSON.parse(data);
        if (config['ticket_prefix']) {
            return config['ticket_prefix'];
        } else {
            throw new InvalidConfigError('Missing ticket_prefix');
        }
    } catch (err) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const ticketPrefix = await new Promise<string>((resolve) => {
            rl.question('Enter the ticket prefix (e.g., "#"): ', (prefix: string) => {
                rl.close();
                resolve(prefix || DEFAULT_TICKET_PREFIX);
            });
        });
        const config = { ticket_prefix: ticketPrefix };
        await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
        return ticketPrefix;
    }
};
