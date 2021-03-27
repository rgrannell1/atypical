export class Hypothesis {
    constructor(opts) {
        this.description = opts.description;
    }
    cases(gen) {
        this.caseGenerator = gen;
    }
    always(predicate) {
        this.predicates.push(predicate);
    }
}
export class Theory {
    constructor(opts) {
        this.description = opts.description;
    }
    async expectAll(hypotheses) {
        this.hypotheses = hypotheses;
    }
    async test(opts) {
        const start = Date.now();
    }
}
//# sourceMappingURL=index.js.map