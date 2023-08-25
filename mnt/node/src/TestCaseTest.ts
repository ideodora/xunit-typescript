import assert from 'assert';
import {
    TestCase,
    TestResult,
    TestSuite,
} from "../lib";
import { WasRun } from "./WasRun";

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
