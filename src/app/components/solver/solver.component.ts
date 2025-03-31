import { Component } from '@angular/core';
import { EquationService } from '../../services/equation.service';
import { GaussService } from '../../services/gauss.service';
import { SubstitutionService } from '../../services/substitution.service';
import { EquationSystem, Solution } from '../../model/equation.model';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { GraphViewerComponent } from "../graph-viewer/graph-viewer.component";
import { MatrixViewerComponent } from "../matrix-viewer/matrix-viewer.component";

@Component({
  selector: 'app-solver',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, GraphViewerComponent, MatrixViewerComponent],
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.scss']
})
export class SolverComponent {
  equations: string[] = ['2x + 3y = 5', 'x - y = 1'];
  system: EquationSystem | undefined;
  solution: Solution | null = null;
  selectedMethod = 'gauss';
  currentStepIndex = 0;
  viewMode: 'matrix' | 'graph' = 'matrix';

  constructor(
    private equationService: EquationService,
    private gaussService: GaussService,
    private substitutionService: SubstitutionService
  ) {
    this.updateSystem();
  }

  updateSystem(): void {
    try {
      this.system = this.equationService.createSystem(this.equations);
      this.solution = null;
      this.currentStepIndex = 0;
    } catch (error) {
      console.error('Erro ao analisar equações:', error);
    }
  }

  addEquation(): void {
    this.equations.push('');
  }

  removeEquation(index: number): void {
    this.equations.splice(index, 1);
    this.updateSystem();
  }

  solve(): void {
    if (!this.system) return;

    switch (this.selectedMethod) {
      case 'gauss':
        this.solution = this.gaussService.solve(this.system);
        break;
      case 'substitution':
        this.solution = this.substitutionService.solve(this.system);
        break;
    }

    this.currentStepIndex = 0;
  }

  nextStep(): void {
    if (this.solution && this.currentStepIndex < this.solution.steps.length - 1) {
      this.currentStepIndex++;
    }
  }

  prevStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }
}