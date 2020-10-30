import MockService from "../../services/MockService";

describe("MockService", () => {
    let instance: MockService;

    beforeEach(() => {
        instance = new MockService();
    });

    test("sum", () => {
        expect(instance.add(1, 1)).toBe(2);
    });
});