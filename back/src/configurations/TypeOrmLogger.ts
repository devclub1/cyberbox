import { isArray } from 'class-validator';
import { Logger as OrmLogger } from 'typeorm';
import Logger from './Logger';

export default class TypeOrmLogger implements OrmLogger {
    constructor(private logger: Logger) { }

    private printParameters(parameters?: any[]):  string {
        return parameters ?
        `(
            ${parameters.map(parameter =>
                isArray(parameter) ? `(${parameter as string})` : parameter as string
            ).join(', ')}
        )`
        : '()';
    }

    logQuery(query: string, parameters?: any[]): void {
        this.logger.writeInfo(`DATABASE: ${query} with parameters ${this.printParameters(parameters)}`);
    }
    logQueryError(error: string, query: string, parameters?: any[]): void {
        this.logger.writeError(`DATABASE: ${error} for ${query} with parameters ${this.printParameters(parameters)}`);
    }
    logQuerySlow(time: number, query: string, parameters?: any[]): void {
        this.logger.writeInfo(`DATABASE: Slow query - ${time} - ${query} with parameters ${this.printParameters(parameters)}`);
    }
    logSchemaBuild(): void {
        // do nothing
    }
    logMigration(): void {
        // do nothing
    }
    log(): void {
        // do nothing
    }
}