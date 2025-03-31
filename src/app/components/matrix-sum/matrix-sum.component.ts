import { Component, OnInit } from '@angular/core';
import { Matrix, MatrixDimensions, MatrixPosition } from '../../model/matrix.models';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-matrix-sum',
    imports: [FormsModule, NgFor],
    templateUrl: './matrix-sum.component.html',
    styleUrls: ['./matrix-sum.component.scss']
})
export class MatrixSumComponent implements OnInit {
  dimensions: MatrixDimensions = { rows: 2, cols: 2 };
  matrixA: Matrix = [];
  matrixB: Matrix = [];
  resultMatrix: Matrix = [];
  currentStep = 0;
  totalSteps = 0;
  isAnimating = false;
  animationInterval: any;
  activeCells: MatrixPosition[] = [];
  explanationText = 'Clique em "Soma Automática" para começar o processo.';
  operator: string = '+';

  ngOnInit(): void {
    this.generateMatrices();
  }

  generateMatrices(): void {
    this.currentStep = 0;
    this.isAnimating = false;
    this.activeCells = [];
    this.totalSteps = this.dimensions.rows * this.dimensions.cols;
    
    this.matrixA = this.createRandomMatrix();
    this.matrixB = this.createRandomMatrix();
    this.resultMatrix = this.createEmptyMatrix();
    
    this.explanationText = 'Matrizes geradas. Clique em "Soma automática" para começar.';
  }

  private createRandomMatrix(): Matrix {
    return Array.from({ length: this.dimensions.rows }, (_, row) =>
      Array.from({ length: this.dimensions.cols }, (_, col) => ({
        value: Math.floor(Math.random() * 10),
        active: false,
        calculated: false
      }))
    );
  }

  private createEmptyMatrix(): Matrix {
    return Array.from({ length: this.dimensions.rows }, (_, row) =>
      Array.from({ length: this.dimensions.cols }, (_, col) => ({
        value: 0,
        active: false,
        calculated: false
      }))
    );
  }

  startStepByStep(): void {
    if (this.isAnimating) {
      this.stopAnimation();
      return;
    }

    this.currentStep = 0;
    this.resultMatrix = this.createEmptyMatrix();
    this.isAnimating = true;
    this.explanationText = 'Executando passo a passo automaticamente...';
    
    this.animationInterval = setInterval(() => {
      if (this.currentStep >= this.totalSteps) {
        this.stopAnimation();
        this.explanationText = 'Soma concluída! Clique em "Reiniciar" para fazer novamente.';
        return;
      }
      this.executeNextStep();
    }, 1500);
  }

  executeNextStep(): void {
    if (this.currentStep >= this.totalSteps) return;

    const row = Math.floor(this.currentStep / this.dimensions.cols);
    const col = this.currentStep % this.dimensions.cols;

    this.resetActiveStates();

    this.matrixA[row][col].active = true;
    this.matrixB[row][col].active = true;
    this.activeCells = [{ row, col }];

    let result = 1;

    switch(this.operator) {
      case '+':
        result = this.matrixA[row][col].value + this.matrixB[row][col].value;
        break;
      case '-':
        result = this.matrixA[row][col].value - this.matrixB[row][col].value;
        break;
      case '*':
        for (let k = 0; k < this.dimensions.cols; k++) {
            result += this.matrixA[row][k].value * this.matrixB[k][col].value;
        }
        break;
      case '/':
        result = this.matrixA[row][col].value / this.matrixB[row][col].value;
        break;
    }

    this.resultMatrix[row][col] = {
      value: result,
      active: true,
      calculated: true
    };

    this.explanationText = 
      `Passo ${this.currentStep + 1} de ${this.totalSteps}: ` +
      `A[${row+1}][${col+1}] (${this.matrixA[row][col].value}) ${this.operator} ` +
      `B[${row+1}][${col+1}] (${this.matrixB[row][col].value}) = ${result}`;

    this.currentStep++;
  }

  manualStep(): void {
    if (this.isAnimating) return;
    
    if (this.currentStep === 0) {
      this.resultMatrix = this.createEmptyMatrix();
    }
    
    if (this.currentStep < this.totalSteps) {
      this.executeNextStep();
    }
  }

  resetActiveStates(): void {
    this.matrixA.forEach(row => row.forEach(cell => cell.active = false));
    this.matrixB.forEach(row => row.forEach(cell => cell.active = false));
    this.resultMatrix.forEach(row => row.forEach(cell => cell.active = false));
  }

  stopAnimation(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    this.isAnimating = false;
  }

  resetAll(): void {
    this.stopAnimation();
    this.currentStep = 0;
    this.activeCells = [];
    this.resultMatrix = this.createEmptyMatrix();
    this.resetActiveStates();
    this.explanationText = 'Pronto para começar novamente. Clique em "Soma automática".';
  }

  trackByIndex(index: number): number {
    return index;
  }
}