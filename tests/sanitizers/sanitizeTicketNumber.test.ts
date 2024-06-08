import { sanitizeTicketNumber } from '../../src/sanitizers/sanitizeTicketNumber';

describe('sanitizeTicketNumber', () => {
    test('removes parentheses, brackets, and hash characters', () => {
        expect(sanitizeTicketNumber('(123)')).toBe('123');
        expect(sanitizeTicketNumber('[456]')).toBe('456');
        expect(sanitizeTicketNumber('#789')).toBe('789');
        expect(sanitizeTicketNumber('(123)[456]#789')).toBe('123456789');
    });

    test('returns the same string if no special characters are present', () => {
        expect(sanitizeTicketNumber('123')).toBe('123');
        expect(sanitizeTicketNumber('456')).toBe('456');
    });

    test('handles empty strings', () => {
        expect(sanitizeTicketNumber('')).toBe('');
    });

    test('handles strings with only special characters', () => {
        expect(sanitizeTicketNumber('()[]#')).toBe('');
    });
});
