
# Atypical

Atypical is a property-based test-runner that allows you to describe tests in terms of:

- expectations & predicates
- hypotheses
- theories composed of hypotheses



### Example

The following example tests a hash-function across arbitrary strings.

```ts
const { Explanation, Theory, Hypothesis } from '@rgrannell/atypical'

const hypothesis = new Hypothesis({ description: '' })
hypothesis
  .cases(function * () {
    while (true) yield [R.any()]
  })
  .expect((str: string) => {
    const hash0 = hash(str)
    const hash1 = hash(str)

    const match = hash0 === hash1

    if (!match) {
      return new Explanation({
        description: 'hashes mismatched for same value',
        data: { hash0, hash1 }
      })
    }

    return match
  })

const theory = new Theory({ description: '' })
theory
  .expectAll({ hashEquality })
  .test({ seconds: 30 })
  .catch(err => {
    throw err
  })
```

### License

The MIT License

Copyright (c) 2020 Róisín Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
