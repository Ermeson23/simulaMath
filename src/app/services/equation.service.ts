import { Injectable } from '@angular/core';
import { Equation, EquationSystem } from '../model/equation.model';

@Injectable({ providedIn: 'root' })
export class EquationService {
  parseEquation(equationStr: string): Equation {
    // Exemplo: "2x + 3y = 5" → { coefficients: [2, 3], constant: 5 }
    const parts = equationStr.split('=');
    const constant = parseFloat(parts[1].trim());
    
    const terms = parts[0].split(/[+-]/).filter(term => term.trim() !== '');
    const coefficients = terms.map(term => {
      const coefMatch = term.match(/(\d*\.?\d*)/)?.[0] || '0';
      return coefMatch === '' ? 1 : parseFloat(coefMatch);
    });
    
    return { coefficients, constant, toString: () => equationStr };
  }

  createSystem(equationStrings: string[]): EquationSystem {
    const equations = equationStrings.map(eq => this.parseEquation(eq));
    const variables = this.detectVariables(equationStrings);
    return { equations, variables };
  }

  private detectVariables(equationStrings: string[]): string[] {
    // Detecta variáveis únicas (x, y, z, etc.)
    const vars = new Set<string>();
    equationStrings.forEach(eq => {
      const matches = eq.match(/[a-z]/gi) || [];
      matches.forEach(v => vars.add(v));
    });
    return Array.from(vars).sort();
  }
}