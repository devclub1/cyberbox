import AuthService from '../../services/AuthService';

const mockedId = 1;

const mockedUser = {
    id: 1
};

const mockedProfile = {
    email: "test@test.com",
    name: "Test"
};

const findOneFound = jest.fn(async (profile: any) => {
    return mockedUser
});

const findOneNotFound = jest.fn(async (profile: any) => {
    return null;
});

const save = jest.fn(async (profile: any) => {
    return { ...profile, id: mockedId }
});


describe("AuthService", () => {
    let authService: AuthService;
    let userRepositoryMock: any;

    beforeEach(() => {
        userRepositoryMock = {
            findOne: findOneFound,
            save
        }

        findOneFound.mockClear();
        findOneNotFound.mockClear();
        save.mockClear();
    });

    test("getUserById - user found", async (done) => {
        authService = new AuthService(userRepositoryMock);
        const result = await authService.getUserById(mockedId);

        expect(findOneFound).toHaveBeenCalledTimes(1);
        expect(findOneFound).toHaveBeenLastCalledWith(mockedId);

        expect(result).toBe(mockedUser);

        done();
    });

    test("getUserById - user not found", async (done) => {
        userRepositoryMock = {
            findOne: findOneNotFound
        };

        authService = new AuthService(userRepositoryMock);
        const result = await authService.getUserById(mockedId);

        expect(findOneNotFound).toHaveBeenCalledTimes(1);
        expect(findOneNotFound).toHaveBeenLastCalledWith(mockedId);

        expect(result).toBe(null);

        done();
    });

    test("getOrCreateUser - user found", async (done) => {
        authService = new AuthService(userRepositoryMock);
        const result = await authService.getOrCreateUser(mockedProfile);

        expect(findOneFound).toHaveBeenCalledTimes(1);
        expect(findOneFound).toHaveBeenLastCalledWith({ email: mockedProfile.email });

        expect(result.id).toBe(mockedId);

        done();
    });

    test("getOrCreateUser - creating user", async (done) => {
        userRepositoryMock = {
            ...userRepositoryMock,
            findOne: findOneNotFound
        }

        authService = new AuthService(userRepositoryMock);
        const result = await authService.getOrCreateUser(mockedProfile);

        expect(findOneNotFound).toHaveBeenCalledTimes(1);
        expect(findOneNotFound).toHaveBeenLastCalledWith({ email: mockedProfile.email });

        expect(save).toHaveBeenCalledTimes(1);
        expect(save).toHaveBeenLastCalledWith(mockedProfile);

        expect(result.id).toBe(mockedId);

        done();
    });
});