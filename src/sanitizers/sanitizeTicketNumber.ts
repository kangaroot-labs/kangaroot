/**
 * Sanitizes the ticket number by removing specific characters.
 * @param {string} ticketNumber - The ticket number.
 * @returns {string} The sanitized ticket number.
 */
export const sanitizeTicketNumber = (ticketNumber: string): string => {
    return ticketNumber.replace(/[()[\]#]/g, '');
};
