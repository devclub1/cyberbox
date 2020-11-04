import { Service } from 'typedi';
import UserRepository from '../repositories/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export default class AuthService {
    constructor(@InjectRepository() private userRepository: UserRepository) { }

    private formatUserData(profile: any): any {
        // validate profile.name profile.email
        return {
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName
        };
    }

    public async getOrCreateUser(profile: any) {
        let user = await this.userRepository.findOne({ email: profile.email });

        if (!user) {
            user = await this.userRepository.save(this.formatUserData(profile));
        }

        return { uuid: user.uuid };
    }

    public async getUserById(uuid: string) {
        return this.userRepository.findOne(uuid);
    }
}