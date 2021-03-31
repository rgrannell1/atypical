/**
 * Create a hypothesis - an set of expected-true predicates across a set of test-cases with a description
 * of the expectation.
 *
 */
export class Hypothesis {
    constructor(opts) {
        this.predicates = [];
        this.description = opts.description;
        return this;
    }
    /**
     * Add test-cases to the hypotheses.
     *
     * @gen a function that returns a generator or asyncronous generator object that yields test-cases.
     */
    cases(gen) {
        this.caseGenerator = gen;
        return this;
    }
    /**
     * Add a predicate (true - false function) to this hypotheses
     *
     * @param predicate a boolean function, or a boolean promise function
     */
    always(predicate) {
        this.predicates.push(predicate);
        return this;
    }
}
//# sourceMappingURL=hypothesis.js.map