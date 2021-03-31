
import * as revexp from '@rgrannell/revexp'

import { Hypothesis, Theory } from '../src/index.js'

const stringHypotheses: Record<string, Hypothesis> = { }

stringHypotheses.selfEqual = new Hypothesis({ description: 'a string is equal to itself' })
  .cases(function * () {
    while (true) {
      yield [revexp.parts.repeat(revexp.parts.any, { from: 0, to: 10 })]
    }
  })
  .always((str: string) => {
    return str === str
  })

stringHypotheses.lessThanEqual = new Hypothesis({ description: 'strings are less than expected length.' })
  .cases(function * () {
    while (true) {
      yield [revexp.parts.repeat(revexp.parts.any, { from: 0, to: 10 })()]
    }
  })
  .always((str: string) => {
    return true
  })

const stringTheory = new Theory({ description: 'all string tests pass' })
  .expectAll(stringHypotheses)

const main = async (): Promise<void> => {
  await stringTheory.test({ seconds: 10 })
}

main()
