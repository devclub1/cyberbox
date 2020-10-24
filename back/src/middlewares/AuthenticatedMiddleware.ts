import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response } from 'express';
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../repositories/UserRepository";

export class Authenticated implements ExpressMiddlewareInterface {
    @InjectRepository()
    private userRepository: UserRepository;

    use(req: Request, _res: Response, next?: (err?: any) => any,) {
        const user = req.session.user;

        if (user && typeof user.id === 'number') {
            this.userRepository.findOne({ id: req.session.user.id })
                .then(result => {
                    if (result) {
                        next();
                    } else {
                        next(new Error("Invalid user"));
                    }
                })
                .catch(_err => {
                    next(new Error("Invalid cookie"))
                });
        } else {
            next(new Error("Invalid cookie"));
        }
    }
}