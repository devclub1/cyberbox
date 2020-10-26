import { Service } from 'typedi';
import { UserRepository } from '../repositories/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export default class AuthenticationService {

    @InjectRepository()
    private userRepository: UserRepository;

    private formatUserData(profile: any): any {
        // validate profile.name profile.email
        return {
            email: profile.email,
            name: profile.name
        }
    }

    public async getOrCreateUser(profile: any) {
        let user = await this.userRepository.findOne({ email: profile.email });

        if (!user) {
            user = await this.userRepository.save(this.formatUserData(profile));
        }

        return { id: user.id };
    }

    public async getUserById(id: number) {
        return this.userRepository.findOne(id);
    }
}