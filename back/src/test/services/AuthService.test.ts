import AuthService from '../../services/AuthService';
import { GenericMock, MockedMember } from '../GenericMock';

const mockedUuid = "1";

const mockedUser = {
    uuid: "1"
};

const mockedProfile = {
    email: "test@test.com",
    firstName: "Test",
    lastName: "Test"
};

const mocks = {
    findOneFound: MockedMember.generate("findOne", jest.fn(async (profile: any) => {
        return mockedUser
    })),
    findOneNotFound: MockedMember.generate("findOne", jest.fn(async (profile: any) => {
        return null;
    })),
    save: MockedMember.generate("save", jest.fn(async (profile: any) => {
        return { ...profile, uuid: mockedUuid }
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
        const result = await authService.getUserById(mockedUuid);

        expect(userRepositoryMock.instance.findOne).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.findOne).toHaveBeenLastCalledWith(mockedUuid);

        expect(result).toBe(mockedUser);

        done();
    });

    test("getUserById - user not found", async (done) => {
        userRepositoryMock.updateInstance(mocks.findOneNotFound);

        const result = await authService.getUserById(mockedUuid);

        expect(userRepositoryMock.instance.findOne).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.findOne).toHaveBeenLastCalledWith(mockedUuid);

        expect(result).toBe(null);

        done();
    });

    test("getOrCreateUser - user found", async (done) => {
        const result = await authService.getOrCreateUser(mockedProfile);

        expect(userRepositoryMock.instance.findOne).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.findOne).toHaveBeenLastCalledWith({ email: mockedProfile.email });

        expect(result.uuid).toBe(mockedUuid);

        done();
    });

    test("getOrCreateUser - creating user", async (done) => {
        userRepositoryMock.updateInstance(mocks.findOneNotFound);

        const result = await authService.getOrCreateUser(mockedProfile);

        expect(userRepositoryMock.instance.findOne).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.findOne).toHaveBeenLastCalledWith({ email: mockedProfile.email });

        expect(userRepositoryMock.instance.save).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.instance.save).toHaveBeenLastCalledWith(mockedProfile);

        expect(result.uuid).toBe(mockedUuid);

        done();
    });
});