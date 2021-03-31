import { Explanation } from './explanation.js';
export interface HypothesisOpts {
    description: string;
}
export declare type PredicateType = ((...args: any[]) => Promise<boolean | Explanation | undefined>) | ((...args: any[]) => boolean | Explanation | undefined);
/**
 * Create a hypothesis - an set of expected-true predicates across a set of test-cases with a description
 * of the expectation.
 *
 */
export declare class Hypothesis {
    description: string;
    predicates: PredicateType[];
    caseGenerator: () => Generator<any[]> | AsyncGenerator<any[]>;
    constructor(opts: HypothesisOpts);
    /**
     * Add test-cases to the hypotheses.
     *
     * @gen a function that returns a generator or asyncronous generator object that yields test-cases.
     */
    cases(gen: () => Generator<any[]> | AsyncGenerator<any[]>): this;
    /**
     * Add a predicate (true - false function) to this hypotheses
     *
     * @param predicate a boolean function, or a boolean promise function
     */
    always(predicate: PredicateType): this;
}
