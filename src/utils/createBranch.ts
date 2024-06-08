import { execSync } from 'child_process';

/**
 * Creates a new Git branch.
 * @param {string} branchName - The name of the branch to create.
 */
export const createBranch = (branchName: string): void => {
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        console.log(`Creating branch: ${branchName}`);
        execSync(`git checkout -b "${branchName}"`);
        console.log(`Branch ${branchName} created successfully.`);
    } catch (err) {
        handleGitError(err);
    }
};

/**
 * Handles errors that occur during Git operations.
 * @param err - The error object.
 */
const handleGitError = (err: unknown): void => {
    if (err instanceof Error) {
        throw new Error('Not a Git repository or unable to create branch.');
    } else {
        throw new Error('An unknown error occurred.');
    }
};
