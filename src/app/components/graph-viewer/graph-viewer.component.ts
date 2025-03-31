import { Component, Input, SimpleChanges } from '@angular/core';
import { EquationSystem } from '../../model/equation.model';
import { NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

import { Chart, CategoryScale, registerables } from 'chart.js';

Chart.register(CategoryScale, ...registerables);

@Component({
  selector: 'app-graph-viewer',
  standalone: true,
  imports: [NgIf, BaseChartDirective],
  templateUrl: './graph-viewer.component.html',
  styleUrl: './graph-viewer.component.scss'
})
export class GraphViewerComponent {

  @Input() system!: EquationSystem;
  @Input() currentSolution?: number[];
  
  // Opções do gráfico
  public lineChartOptions = {
    responsive: true,
    scales: {
      x: {
        min: -10,
        max: 10,
        ticks: {
          stepSize: 1
        }
      },
      y: {
        min: -10,
        max: 10,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };
  
  public lineChartLegend = true;
  public lineChartType: any = 'line';
  public lineChartData: any[] = [];
  public showSolution = false;
barChartOptions: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['system'] || changes['currentSolution']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    if (!this.system || this.system.variables.length !== 2) {
      return;
    }

    this.lineChartData = this.system.equations.map((eq, i) => {
      // Para equações lineares ax + by = c
      const a = eq.coefficients[0];
      const b = eq.coefficients[1];
      const c = eq.constant;
      
      // Gerar pontos para o gráfico
      const points = [];
      for (let x = -10; x <= 10; x += 0.5) {
        if (b !== 0) {
          const y = (c - a * x) / b;
          points.push({ x, y });
        } else {
          // Linha vertical quando b = 0 (ax = c)
          if (Math.abs(a * x - c) < 0.1) {
            for (let y = -10; y <= 10; y += 1) {
              points.push({ x, y });
            }
          }
        }
      }
      
      return {
        label: `Eq ${i+1}: ${a}x + ${b}y = ${c}`,
        data: points.map(p => ({ x: p.x, y: p.y })),
        borderColor: this.getColor(i),
        backgroundColor: 'rgba(0,0,0,0)',
        pointRadius: 0,
        borderWidth: 2,
        fill: false,
        tension: 0
      };
    });

    // Adicionar solução atual se existir
    if (this.currentSolution && this.currentSolution.length === 2) {
      this.lineChartData.push({
        label: 'Solução Atual',
        data: [{ x: this.currentSolution[0], y: this.currentSolution[1] }],
        borderColor: '#000000',
        backgroundColor: '#2ecc71',
        pointRadius: 8,
        pointHoverRadius: 10,
        borderWidth: 2,
        fill: false,
        showLine: false
      });
    }
  }

  private getColor(index: number): string {
    const colors = [
      '#3498db', // azul
      '#e74c3c', // vermelho
      '#f1c40f', // amarelo
      '#2ecc71', // verde
      '#9b59b6'  // roxo
    ];
    return colors[index % colors.length];
  }

  toggleSolution(): void {
    this.showSolution = !this.showSolution;
    this.updateChart();
  }

}
