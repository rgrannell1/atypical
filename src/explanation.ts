
interface ExplanationOpts {
  description: string
  data: Record<string, any>
}

/**
 * Include information about a test-failure to aid debugging the issue.
 *
 */
export class Explanation {
  description: string
  data: Record<string, any>

  constructor (opts: ExplanationOpts) {
    this.description = opts.description
    this.data = opts.data
  }
}
