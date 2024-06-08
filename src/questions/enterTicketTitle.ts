import readline from 'readline';

/**
 * Prompts the user to enter the ticket title.
 * @returns {Promise<string>} The ticket title entered by the user.
 */
export const enterTicketTitle = (): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise<string>((resolve) => {
        const askForTitle = () => {
            rl.question('Enter the ticket title: ', (title: string) => {
                if (/\d/.test(title)) {
                    rl.close();
                    resolve(title);
                } else {
                    console.log('The ticket title must contain at least one number. Please try again.');
                    askForTitle();
                }
            });
        };
        askForTitle();
    });
};
