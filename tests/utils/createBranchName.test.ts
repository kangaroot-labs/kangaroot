import { createBranchName } from '../../src/utils/createBranchName';

describe('createBranchName', () => {
    test('replaces spaces, periods, and underscores with hyphens', () => {
        expect(createBranchName('file name')).toBe('file-name');
        expect(createBranchName('file.name')).toBe('file-name');
        expect(createBranchName('file_name')).toBe('file-name');
    });

    test('removes question marks and exclamation marks', () => {
        expect(createBranchName('file?name!')).toBe('filename');
    });

    test('converts to lowercase', () => {
        expect(createBranchName('FileName')).toBe('filename');
    });

    test('handles empty strings', () => {
        expect(createBranchName('')).toBe('');
    });

    test('handles strings with only special characters', () => {
        expect(createBranchName('?!')).toBe('');
    });
});
