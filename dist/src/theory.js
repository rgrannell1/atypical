import chalk from 'chalk';
/**
 * A theory is a collection of hypotheses that should be tested collectively. A theory passes
 * if all hypotheses attached pass too.
 *
 */
export class Theory {
    constructor(opts) {
        this.description = opts.description;
        return this;
    }
    /**
     * Set the hypotheses for this theory
     *
     * @param hypotheses an object of hypotheses
     *
     * @returns
     */
    expectAll(hypotheses) {
        this.hypotheses = hypotheses;
        return this;
    }
    /**
     * Test each hypothesis that was added to the theory object
     *
     * @param opts
     * @param opts.seconds the maximum number of seconds to run tests for
     *
     * @returns
     */
    async test(opts) {
        const budget = 1_000 * (opts.seconds / Object.values(this.hypotheses).length);
        let idx = 0;
        for (const hypothesis of Object.values(this.hypotheses)) {
            let caseCount = 0;
            idx++;
            const gen = hypothesis.caseGenerator();
            const start = Date.now();
            // -- generate cases while enough time remains
            while (Date.now() - start < budget) {
                const { value, done } = await gen.next();
                caseCount++;
                if (done === true) {
                    break;
                }
                // -- test each predicate for the test-case
                for (const predicate of hypothesis.predicates) {
                    const expectationResult = await predicate(...value);
                    if (expectationResult !== true && typeof expectationResult !== 'undefined') {
                        console.error(`- hypothesis "${hypothesis.description}" ${chalk.red('FAILED')} predicate #${idx} after ${caseCount} cases:\n${this.caseSummary(expectationResult, value)}`);
                        console.error(`theory "${this.description}" ${chalk.red('FAILED')}`);
                        return {
                            input: value,
                            predicate: () => predicate(...value)
                        };
                    }
                }
            }
            console.error(`- hypothesis "${hypothesis.description}" ${chalk.green('HELD')} for ${caseCount.toLocaleString()} test-cases`);
        }
        console.error(`theory "${this.description}" ${chalk.green('HELD')}`);
    }
    caseSummary(result, value) {
        if (typeof result === 'object') {
            return `  reason: ${result.description}\n    ${JSON.stringify(result.data)}`;
        }
        else {
            return JSON.stringify(value, null, 2);
        }
    }
}
//# sourceMappingURL=theory.js.map