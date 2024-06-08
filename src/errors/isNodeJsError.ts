interface NodeJsError extends Error {
    code?: string;
}

const isNodeJsError = (error: unknown): error is NodeJsError => {
    return error instanceof Error && 'code' in error;
};
