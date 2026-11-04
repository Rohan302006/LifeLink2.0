// Throw this from services when something is the user's fault (wrong input, no permission...).
export class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}