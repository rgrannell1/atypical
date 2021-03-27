import chalk from "chalk"

export interface HypothesisOpts {
  description: string
}

export type PredicateType =
  ((...args: any[]) => Promise<boolean>) |
  ((...args: any[]) => boolean)

export class Hypothesis {
  description: string
  predicates: PredicateType[] = []
  caseGenerator: () => Generator<any[]> | AsyncGenerator<any[]>

  constructor(opts: HypothesisOpts) {
    this.description = opts.description
    return this
  }

  /**
   * Add test-cases to the hypotheses.
   *
   * @gen a function that returns a generator or asyncronous generator object that yields test-cases.
   */
  cases (gen: () => Generator<any[]> | AsyncGenerator<any[]>) {
    this.caseGenerator = gen
    return this
  }

  /**
   * Add a predicate (true - false function) to this hypotheses
   *
   * @param predicate a boolean function, or a boolean promise function
   */
  always (predicate: PredicateType) {
    this.predicates.push(predicate)
    return this
  }
}

export interface TheoryOpts {
  description: string
}

export interface TestOpts {
  seconds: number
}

export class Theory {
  description: string
  hypotheses: Record<string, Hypothesis>

  constructor (opts: TheoryOpts) {
    this.description = opts.description
    return this
  }

  /**
   * add an object of hypotheses to this theory.
   *
   * @param hypotheses
   * @returns
   */
  expectAll (hypotheses: Record<string, Hypothesis>) {
    this.hypotheses = hypotheses
    return this
  }
  /**
   * Test each hypothesis
   *
   * @param opts
   * @returns
   */
  async test (opts: TestOpts) {
   const budget = 1_000 * (opts.seconds / Object.values(this.hypotheses).length)

   let idx = 0
   let caseCount = 0

    for (const hypothesis of Object.values(this.hypotheses)) {
      idx++
      const gen = hypothesis.caseGenerator()

      const start = Date.now()

      // -- generate cases while enough time remains
      while (Date.now() - start < budget) {
        const { value, done } = await gen.next()
        caseCount++

        if (done) {
          break
        }

        // -- test each predicate for the test-case
        for (const predicate of hypothesis.predicates) {
          const expectationResult = await predicate(...value)

          if (expectationResult === false) {
            console.error(`- hypothesis "${hypothesis.description}" ${chalk.red('FAILED')} predicate #${idx}`)
            console.error(`theory "${this.description}" ${chalk.red('FAILED')}`)

            return {
              input: value,
              predicate: () => predicate(...value)
            }
          }
        }

      }

      console.error(`- hypothesis "${hypothesis.description}" ${chalk.green('HELD')} for ${caseCount.toLocaleString()} test-cases`)
    }

    console.error(`theory "${this.description}" ${chalk.green('HELD')}`)
  }
}
