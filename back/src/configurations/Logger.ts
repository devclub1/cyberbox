import { Service } from 'typedi';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { Options, } from 'morgan';
import { IncomingMessage, ServerResponse } from 'http';

@Service()
export default class Logger {
    private transports: winston.transport[];
    private logger: winston.Logger;

    constructor() {
        this.initializeTransports();

        this.logger = winston.createLogger({
            transports: this.transports,
            exitOnError: false
        });
    }

    public writeError(message: string, stacktrace?: string) {
        this.logger.error(message + " - " + stacktrace);
    }

    public getMorganOptions(): Options<IncomingMessage, ServerResponse> {
        return {
            stream: {
                write: (message: string) => {
                    this.logger.debug(message.trim());
                }
            }
        }
    }

    private initializeTransports(): void {
        this.transports = [
            this.initializeAccessTransport(),
            this.initializeErrorTransport(),
        ];

        // disable in PROD after implementing .env configurations
        this.transports.push(this.initializeConsoleTransport());
    }

    private initializeAccessTransport(): winston.transport {
        return new winston.transports.DailyRotateFile({
            level: 'debug',
            filename: '%DATE%.log',
            dirname: 'logs/access',
            datePattern: 'YYYY-MM-DD',
            format: winston.format.combine(this.removeErrors(), winston.format.timestamp(), winston.format.json()),
            utc: true,
            maxSize: '20m',
        });
    }

    private initializeErrorTransport(): winston.transport {
        return new winston.transports.DailyRotateFile({
            level: 'warn',
            filename: '%DATE%.log',
            dirname: 'logs/error',
            datePattern: 'YYYY-MM-DD',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            utc: true,
            maxSize: '20m',
        });
    }

    private initializeConsoleTransport(): winston.transport {
        return new winston.transports.Console({ level: 'debug' });
    }

    private removeErrors = winston.format((info, opts) => {
        return info.level === 'error' ? false : info;
    });
}