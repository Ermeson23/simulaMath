export interface Equation {
    coefficients: number[];
    constant: number;
    toString(): string;
}
  
export interface EquationSystem {
    equations: Equation[];
    variables: string[];
}

export interface SolutionStep {
    description: string;
    matrix?: number[][];
    equations?: Equation[];
    currentSolution?: number[];
    error?: number;
}

export interface Solution {
    method: string;
    steps: SolutionStep[];
    finalSolution: number[] | null;
    error?: string;
}