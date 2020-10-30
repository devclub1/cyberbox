export default class MockService {
    public add(a: number, b: number) {
        return a + b;
    }

    public divide(a: number, b: number) {
        return b !== 0 ? a / b : 0;
    }
}