/**
 * Converts a string to a file-safe name by replacing spaces, periods, and underscores with hyphens,
 * and removing question marks and exclamation marks.
 * @param {string} str - The input string.
 * @returns {string} The file-safe name.
 */
export const createBranchName = (str: string): string => {
    return str.replace(/[\s._]+/g, '-').replace(/[?!]+/g, '').toLowerCase();
};
