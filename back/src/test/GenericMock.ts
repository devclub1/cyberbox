export class MockedMember {
    constructor(public name: string, public implementation: jest.Mock) {
    }

    public static generate(name: string, implementation: jest.Mock) {
        return new MockedMember(name, implementation);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class GenericMock {
    _instance: any = {};

    get instance(): any {
        return this._instance;
    }

    constructor(...members: MockedMember[]) {
        this.updateInstance(...members);
    }

    updateInstance(...members: MockedMember[]) {
        members.forEach(member => {
            member.implementation.mockClear();
            this._instance[member.name] = member.implementation;
        });
    }
}