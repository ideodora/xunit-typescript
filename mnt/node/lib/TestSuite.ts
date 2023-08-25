import { TestCase } from './TestCase';
import { TestResult } from './TestResult';

export class TestSuite {
    tests: TestCase[] = [];

    add(test: TestCase) {
        this.tests.push(test);
    }

    run(result: TestResult) {
        for (const test of this.tests) {
            test.run(result);
        }
        return result;
    }
}
