import assert from 'assert';

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

export class TestResult {
    runCount = 0;
    errorCount = 0;

    testStarted() {
        this.runCount += 1;
    }

    testFailed() {
        this.errorCount += 1;
    }

    summary() {
        return `${this.runCount} run, ${this.errorCount} failed`;
    }
}

export class TestCase {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    setUp() {}

    tearDown() {}

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

export class TestCaseTest extends TestCase {
    result?: TestResult;

    setUp() {
        this.result = new TestResult();
    }
    testTemplateMethod() {
        const test = new WasRun('testMethod');
        test.run(this.result!);
        assert.equal(test.log, 'setUp testMethod tearDown ');
    }

    testResult() {
        const test = new WasRun('testMethod');
        test.run(this.result!);
        assert.equal('1 run, 0 failed', this.result!.summary());
    }

    testResultFailed() {
        const test = new WasRun('testBrokenMethod');
        test.run(this.result!);
        assert('1 run, 1 failed', this.result!.summary());
    }

    testFailedFormatting() {
        this.result!.testStarted();
        this.result!.testFailed();
        assert('1 run, 1 failed', this.result!.summary());
    }

    testSuite() {
        const suite = new TestSuite();
        suite.add(new WasRun('testMethod'));
        suite.add(new WasRun('testBrokenMethod'));
        suite.run(this.result!);
        assert.equal('2 run, 1 failed', this.result!.summary());
    }
}

const suite = new TestSuite();
suite.add(new TestCaseTest('testTemplateMethod'));
suite.add(new TestCaseTest('testResult'));
suite.add(new TestCaseTest('testResultFailed'));
suite.add(new TestCaseTest('testFailedFormatting'));
suite.add(new TestCaseTest('testSuite'));
const result = new TestResult();
suite.run(result);
console.log(result.summary());
