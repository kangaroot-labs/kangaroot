// tests/utils/createBranch.test.ts
import { createBranch } from '../../src/utils/createBranch';
import { execSync } from 'child_process';

jest.mock('child_process', () => ({
    execSync: jest.fn(),
}));

describe('createBranch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new branch', () => {
        createBranch('feature-branch');
        expect(execSync).toHaveBeenCalledWith('git checkout -b "feature-branch"');
    });

    it('should handle errors', () => {
        (execSync as jest.Mock).mockImplementationOnce(() => {
            throw new Error('Not a Git repository');
        });
        expect(() => createBranch('feature-branch')).toThrow('Not a Git repository or unable to create branch.');
    });
});
