export interface MatrixCell {
    value: number;
    active: boolean;
    calculated: boolean;
}
  
  export type Matrix = MatrixCell[][];
  
  export interface MatrixPosition {
    row: number;
    col: number;
  }
  
  export interface MatrixDimensions {
    rows: number;
    cols: number;
}