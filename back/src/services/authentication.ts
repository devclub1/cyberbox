import { getRepository } from 'typeorm';
import { User } from '../models/users';

export const getOrCreateUser = async (profile: any) => {
    const userRepository = await getRepository(User);

    const existingUser = await userRepository.findOne({ email: profile.email });

    if (existingUser) {
        return { id: existingUser.id };
    }

    const newUser = await userRepository.save(
        new User(profile.firstname + " " + profile.lastname, profile.email)
    );

    return { id: newUser.id };
}