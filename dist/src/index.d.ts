export interface HypothesisOpts {
    description: string;
}
export declare type PredicateType = ((...args: any[]) => Promise<boolean>) | ((...args: any[]) => boolean);
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
export interface TheoryOpts {
    description: string;
}
export interface TestOpts {
    seconds: number;
}
export declare class Theory {
    description: string;
    hypotheses: Record<string, Hypothesis>;
    constructor(opts: TheoryOpts);
    /**
     * add an object of hypotheses to this theory.
     *
     * @param hypotheses
     * @returns
     */
    expectAll(hypotheses: Record<string, Hypothesis>): this;
    /**
     * Test each hypothesis
     *
     * @param opts
     * @returns
     */
    test(opts: TestOpts): Promise<{
        input: any;
        predicate: () => boolean | Promise<boolean>;
    } | undefined>;
}
