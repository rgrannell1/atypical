import { Hypothesis } from './hypothesis.js';
export declare type PredicateType = ((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean);
export interface TheoryOpts {
    description: string;
}
export interface TestOpts {
    seconds: number;
}
/**
 * A theory is a collection of hypotheses that should be tested collectively. A theory passes
 * if all hypotheses attached pass too.
 *
 */
export declare class Theory {
    description: string;
    hypotheses: Record<string, Hypothesis>;
    constructor(opts: TheoryOpts);
    /**
     * Set the hypotheses for this theory
     *
     * @param hypotheses an object of hypotheses
     *
     * @returns
     */
    expectAll(hypotheses: Record<string, Hypothesis>): this;
    /**
     * Test each hypothesis that was added to the theory object
     *
     * @param opts
     * @param opts.seconds the maximum number of seconds to run tests for
     *
     * @returns
     */
    test(opts: TestOpts): Promise<{
        input: any;
        predicate: Function;
    } | undefined>;
    private caseSummary;
}
