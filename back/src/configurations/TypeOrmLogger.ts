import { isArray } from 'class-validator';
import { Logger as OrmLogger, QueryRunner } from 'typeorm';
import Logger from './Logger';

export default class TypeOrmLogger implements OrmLogger {
    constructor(private logger: Logger) { }

    private printParameters(parameters?: any[]) {
        return parameters ? `(${parameters.map(parameter =>
            isArray(parameter) ? `(${parameter})` : parameter
        ).join(', ')})` : '()';
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.writeInfo(`DATABASE: ${query} with parameters ${this.printParameters(parameters)}`);
    }
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.writeError(`DATABASE: ${error} for ${query} with parameters ${this.printParameters(parameters)}`);
    }
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.logger.writeInfo(`DATABASE: Slow query - ${time} - ${query} with parameters ${this.printParameters(parameters)}`);
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        // do nothing
    }
    logMigration(message: string, queryRunner?: QueryRunner) {
        // do nothing
    }
    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
        // do nothing
    }
}