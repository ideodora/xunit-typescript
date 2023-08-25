import { TestCase } from '../lib';


export class WasRun extends TestCase {
    log = '';

    testMethod() {
        this.log = this.log + 'testMethod ';
    }

    testBrokenMethod() {
        throw new Error();
    }

    setUp() {
        this.log = 'setUp ';
    }

    tearDown() {
        this.log = this.log + 'tearDown ';
    }
}
