import AuthService from '../../services/AuthService';
import { GenericMock, MockedMember } from '../GenericMock';

const mockedId = 1;

const mockedUser = {
    id: 1
};

const mockedProfile = {
    email: "test@test.com",
    name: "Test"
};

const mocks = {
    findOneFound: MockedMember.generate("findOne", jest.fn(async (profile: any) => {
        return mockedUser
    })),
    findOneNotFound: MockedMember.generate("findOne", jest.fn(async (profile: any) => {
        return null;
    })),
    save: MockedMember.generate("save", jest.fn(async (profile: any) => {
        return { ...profile, id: mockedId }
    }))
};

describe("AuthService", () => {
    const userRepositoryMock: GenericMock = new GenericMock(
        mocks.findOneFound,
        mocks.save
    );
    const authService: AuthService = new AuthService(userRepositoryMock.instance);

    beforeEach(() => {
        userRepositoryMock.updateInstance(
            mocks.findOneFound,
            mocks.save
        );
    });

    test("getUserById - user found", async (done) => {
        const result = await authService.getUserById(mockedId);

        expect(userRepositoryMock.instance.findOne).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.findOne).toHaveBeenLastCalledWith(mockedId);

        expect(result).toBe(mockedUser);

        done();
    });

    test("getUserById - user not found", async (done) => {
        userRepositoryMock.updateInstance(mocks.findOneNotFound);

        const result = await authService.getUserById(mockedId);

        expect(userRepositoryMock.instance.findOne).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.findOne).toHaveBeenLastCalledWith(mockedId);

        expect(result).toBe(null);

        done();
    });

    test("getOrCreateUser - user found", async (done) => {
        const result = await authService.getOrCreateUser(mockedProfile);

        expect(userRepositoryMock.instance.findOne).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.findOne).toHaveBeenLastCalledWith({ email: mockedProfile.email });

        expect(result.id).toBe(mockedId);

        done();
    });

    test("getOrCreateUser - creating user", async (done) => {
        userRepositoryMock.updateInstance(mocks.findOneNotFound);

        const result = await authService.getOrCreateUser(mockedProfile);

        expect(userRepositoryMock.instance.findOne).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.findOne).toHaveBeenLastCalledWith({ email: mockedProfile.email });

        expect(userRepositoryMock.instance.save).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.save).toHaveBeenLastCalledWith(mockedProfile);

        expect(result.id).toBe(mockedId);

        done();
    });
});