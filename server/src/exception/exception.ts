export class HttpError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}

export class AuthenticationError extends HttpError {
    constructor(message: string) {
        super(401, message);
        this.name = "AuthenticationError";
    }
}
