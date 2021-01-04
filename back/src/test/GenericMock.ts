/* eslint max-classes-per-file: off */
export class MockedMember {
    constructor(public name: string, public implementation: jest.Mock) {
    }

    public static generate(name: string, implementation: jest.Mock): MockedMember {
        return new MockedMember(name, implementation);
    }
}

export class GenericMock {
    _instance: any = {};

    get instance(): any {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
        return this._instance;
    }

    constructor(...members: MockedMember[]) {
        this.updateInstance(...members);
    }

    updateInstance(...members: MockedMember[]): void {
        members.forEach(member => {
            member.implementation.mockClear();
            this._instance[member.name] = member.implementation;
        });
    }
}