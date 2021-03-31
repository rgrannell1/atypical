interface ExplanationOpts {
    description: string;
    data: Record<string, any>;
}
/**
 * Include information about a test-failure to aid debugging the issue.
 *
 */
export declare class Explanation {
    description: string;
    data: Record<string, any>;
    constructor(opts: ExplanationOpts);
}
export {};
