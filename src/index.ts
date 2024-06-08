import { enterTicketTitle } from './questions/enterTicketTitle';
import { createBranch } from './utils/createBranch';
import { createBranchName } from './utils/createBranchName';
import { sanitizeTicketNumber } from './sanitizers/sanitizeTicketNumber';
import { enterTicketPrefix } from './questions/enterTicketPrefix';
import { InvalidConfigError } from './errors/InvalidConfigError';
import { updateConfig } from './utils/updateConfig';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Main function to run the script.
 */
const run = async (): Promise<void> => {
    const argv = yargs(hideBin(process.argv))
        .command('config', 'Set configuration variables', (yargs) => {
            return yargs
                .option('ticket.prefix', {
                    describe: 'Set the ticket prefix',
                    type: 'string'
                });
        })
        .help()
        .argv;

    if (argv._.includes('config')) {
        if (argv['ticket.prefix']) {
            await updateConfig('ticket_prefix', argv['ticket.prefix']);
            console.log(`Configuration updated: ticket.prefix = ${argv['ticket.prefix']}`);
        }
        return;
    }

    try {
        const ticketPrefix = await enterTicketPrefix();
        const ticketTitle = await enterTicketTitle();
        const [ticketNumber, ...titleWords] = ticketTitle.split(' ');
        const sanitizedTicketNumber = sanitizeTicketNumber(ticketNumber);
        const branchName = `${ticketPrefix}${sanitizedTicketNumber}-${createBranchName(titleWords.join(' '))}`;
        createBranch(branchName);
    } catch (err) {
        handleError(err);
    }
};

/**
 * Handles errors that occur during script execution.
 * @param err - The error object.
 */
const handleError = (err: unknown): void => {
    if (err instanceof InvalidConfigError) {
        console.error('Configuration error:', err.message);
    } else if (err instanceof Error) {
        console.error('An error occurred while running the script:', err.message);
    } else {
        console.error('An unknown error occurred.');
    }
};

run();
