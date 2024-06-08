import readline from 'readline';
import { enterTicketTitle } from '../../src/questions/enterTicketTitle';

jest.mock('readline');

describe('enterTicketTitle', () => {
    test('prompts the user to enter the ticket title and validates it', async () => {
        const mockRl = {
            question: jest.fn(),
            close: jest.fn()
        };
        (readline.createInterface as jest.Mock).mockReturnValue(mockRl);

        // Simulate user input: first invalid, then valid
        mockRl.question
            .mockImplementationOnce((questionText, callback) => callback('InvalidTitle'))
            .mockImplementationOnce((questionText, callback) => callback('ValidTitle1'));

        const title = await enterTicketTitle();
        expect(title).toBe('ValidTitle1');
        expect(mockRl.question).toHaveBeenCalledWith('Enter the ticket title: ', expect.any(Function));
        expect(mockRl.close).toHaveBeenCalled();
    });
});
