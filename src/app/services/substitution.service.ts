import { Injectable } from '@angular/core';
import { EquationSystem, Solution, SolutionStep } from '../model/equation.model';

@Injectable({ providedIn: 'root' })
export class SubstitutionService {
  solve(system: EquationSystem): Solution {
    const steps: SolutionStep[] = [];
    const variables = [...system.variables];
    const equations = JSON.parse(JSON.stringify(system.equations));
    
    steps.push({
      description: 'Sistema original',
      equations: JSON.parse(JSON.stringify(equations))
    });

    // Fase de substituição progressiva
    for (let i = 0; i < equations.length - 1; i++) {
      // Isolar a variável atual
      const currentVar = variables[i];
      const currentEq = equations[i];
      
      if (currentEq.coefficients[i] === 0) {
        return {
          method: 'Substituição',
          steps,
          finalSolution: null,
          error: `Não é possível isolar ${currentVar} (coeficiente zero)`
        };
      }

      // Criar passo de isolamento
      steps.push({
        description: `Isolando ${currentVar} na equação ${i+1}`,
        equations: JSON.parse(JSON.stringify(equations))
      });

      // Substituir nas equações seguintes
      for (let j = i + 1; j < equations.length; j++) {
        const factor = equations[j].coefficients[i] / currentEq.coefficients[i];
        
        for (let k = i; k < equations[j].coefficients.length; k++) {
          equations[j].coefficients[k] -= factor * currentEq.coefficients[k];
        }
        equations[j].constant -= factor * currentEq.constant;

        steps.push({
          description: `Substituindo ${currentVar} na equação ${j+1}`,
          equations: JSON.parse(JSON.stringify(equations))
        });
      }
    }

    // Fase de substituição regressiva
    const solution = new Array(variables.length);
    for (let i = equations.length - 1; i >= 0; i--) {
      let sum = equations[i].constant;
      
      for (let j = i + 1; j < equations.length; j++) {
        sum -= equations[i].coefficients[j] * solution[j];
      }

      if (equations[i].coefficients[i] === 0) {
        return {
          method: 'Substituição',
          steps,
          finalSolution: null,
          error: `Divisão por zero ao resolver para ${variables[i]}`
        };
      }

      solution[i] = sum / equations[i].coefficients[i];
      
      steps.push({
        description: `Resolvendo para ${variables[i]} = ${solution[i].toFixed(4)}`,
        currentSolution: [...solution]
      });
    }

    return {
      method: 'Substituição',
      steps,
      finalSolution: solution
    };
  }
}