import { TestResult } from './TestResult';


export class TestCase {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    setUp() { }

    tearDown() { }

    run(result: TestResult) {
        result.testStarted();

        this.setUp();

        // @ts-ignore
        const method = this[this.name].bind(this);
        if (typeof method !== 'function') {
            throw new Error('not a method');
        }
        try {
            method();
        } catch (error) {
            result.testFailed();
        }

        this.tearDown();
    }
}
