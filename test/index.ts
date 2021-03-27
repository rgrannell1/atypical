
import * as revexp from '@rgrannell/revexp'

import { Theory, Hypothesis } from '../src/index.js'

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
  .cases(function* () {
    while (true) {
      yield [revexp.parts.repeat(revexp.parts.any, { from: 0, to: 10 })]
    }
  })
  .always((str: string) => {
    return false
  })

const stringTheory = new Theory({ description: 'all string tests pass' })
  .expectAll(stringHypotheses)

stringTheory
  .test({ seconds: 10 })

  .catch(res => {
    throw err
  })
