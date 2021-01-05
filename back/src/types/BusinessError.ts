export default class BusinessError extends Error {
    public shouldLog = false;
    public code: number;

    constructor(message: string, code: number, shouldLog?: boolean) {
        super(message);

        this.code = code;
        this.shouldLog = shouldLog;
        Error.captureStackTrace(this, BusinessError);
    }
}