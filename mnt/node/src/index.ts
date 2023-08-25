import { TestSuite, TestResult } from "../lib";
import { TestCaseTest } from './TestCaseTest';

const suite = new TestSuite();
suite.add(new TestCaseTest('testTemplateMethod'));
suite.add(new TestCaseTest('testResult'));
suite.add(new TestCaseTest('testResultFailed'));
suite.add(new TestCaseTest('testFailedFormatting'));
suite.add(new TestCaseTest('testSuite'));

const result = new TestResult();

suite.run(result);

console.log(result.summary());
