import { Injectable } from '@angular/core';
import { EquationSystem, Solution, SolutionStep } from '../model/equation.model';

@Injectable({ providedIn: 'root' })
export class GaussService {
  solve(system: EquationSystem): Solution {
    const steps: SolutionStep[] = [];
    const matrix = this.createAugmentedMatrix(system);
    
    steps.push({
      description: 'Matriz aumentada inicial',
      matrix: JSON.parse(JSON.stringify(matrix))
    });

    // Fase de eliminação
    for (let i = 0; i < matrix.length; i++) {
      // Pivoteamento parcial
      let maxRow = i;
      for (let j = i + 1; j < matrix.length; j++) {
        if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
          maxRow = j;
        }
      }
      
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
      
      steps.push({
        description: `Pivoteamento: Linha ${i+1} ↔ Linha ${maxRow+1}`,
        matrix: JSON.parse(JSON.stringify(matrix))
      });

      // Eliminação
      for (let j = i + 1; j < matrix.length; j++) {
        const factor = matrix[j][i] / matrix[i][i];
        for (let k = i; k < matrix[0].length; k++) {
          matrix[j][k] -= factor * matrix[i][k];
        }
        
        steps.push({
          description: `Eliminação: Linha ${j+1} -= ${factor.toFixed(2)} × Linha ${i+1}`,
          matrix: JSON.parse(JSON.stringify(matrix))
        });
      }
    }

    // Fase de substituição regressiva
    const solution = new Array(matrix.length);
    for (let i = matrix.length - 1; i >= 0; i--) {
      solution[i] = matrix[i][matrix[0].length - 1];
      for (let j = i + 1; j < matrix.length; j++) {
        solution[i] -= matrix[i][j] * solution[j];
      }
      solution[i] /= matrix[i][i];
      
      steps.push({
        description: `Substituição regressiva: x${i+1} = ${solution[i].toFixed(4)}`,
        currentSolution: [...solution]
      });
    }

    return {
      method: 'Eliminação de Gauss',
      steps,
      finalSolution: solution
    };
  }

  private createAugmentedMatrix(system: EquationSystem): number[][] {
    return system.equations.map(eq => [...eq.coefficients, eq.constant]);
  }
}