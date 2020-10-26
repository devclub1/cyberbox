import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { Inject } from "typedi";
import Logger from "../configurations/Logger";
import BusinessError from "../types/BusinessError";

@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    @Inject()
    private logger: Logger;

    error(error: any, request: any, response: any, next: (err?: any) => any): void {
        if (error instanceof BusinessError) {
            if (error.shouldLog) {
                this.logger.writeError(error.code + ' - ' + error.message, error.stack);
            }

            response.status(error.code)
            response.send({ message: error.message });
        } else {
            this.logger.writeError(error.message, error.stack);

            response.status(500)
            response.send({ message: "An internal error happened - Try again" });
        }
    }
}