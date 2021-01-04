import { Service } from 'typedi';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { Options, } from 'morgan';
import { IncomingMessage, ServerResponse } from 'http';
import properties from '../properties';

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

    public writeInfo(message: string): void {
        this.logger.info(message);
    }

    public writeError(message: string, stacktrace?: string): void {
        this.logger.error(message + ' - ' + stacktrace);
    }

    public getMorganOptions(): Options<IncomingMessage, ServerResponse> {
        return {
            stream: {
                write: (message: string) => {
                    this.logger.info(`ACCESS: ${message.trim()}`);
                }
            }
        };
    }

    private initializeTransports(): void {
        this.transports = [
            this.initializeAccessTransport(),
            this.initializeErrorTransport(),
        ];

        if(!properties.PROD) {
            this.transports.push(this.initializeConsoleTransport());
        }
    }

    private initializeAccessTransport(): winston.transport {
        return new winston.transports.DailyRotateFile({
            level: 'info',
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
            level: 'error',
            filename: '%DATE%.log',
            dirname: 'logs/error',
            datePattern: 'YYYY-MM-DD',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            utc: true,
            maxSize: '20m',
        });
    }

    private initializeConsoleTransport(): winston.transport {
        return new winston.transports.Console(
            {
                level: 'info',
                format: winston.format.combine(winston.format.colorize(), winston.format.align(), winston.format.simple())
            }
        );
    }

    private removeErrors = winston.format((info) => {
        return info.level === 'error' ? false : info;
    });
}