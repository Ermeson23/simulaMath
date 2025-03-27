import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('svg', { static: false }) svgElement!: ElementRef<SVGSVGElement>;
  
  private width = 600;
  private height = 400;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };

  private xScale: d3.ScaleLinear<number, number>;
  private yScale: d3.ScaleLinear<number, number>;

  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private line!: d3.Line<[number, number]>; 

  public aValue: number = 1;
  public currentFunc: Function = this.linearFunc;
  public currentFuncName: string = 'linear';
  public currentColor: string = 'green';

  constructor(private renderer: Renderer2) {
    this.xScale = d3.scaleLinear().domain([0.1, 3]).range([this.margin.left, this.width - this.margin.right]);
    this.yScale = d3.scaleLinear().domain([-3, 8]).range([this.height - this.margin.bottom, this.margin.top]);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Verificar se o svgElement está disponível antes de usar
    if (this.svgElement) {
      this.createGraph();
    }
  }

  // Funções para gerar os dados
  linearFunc(x: number, a: number = 1): number {
    return a * x;
  }

  expFunc(x: number, a: number = 1): number {
    return Math.exp(a * x);
  }

  logFunc(x: number, a: number = 1): number {
    return x > 0 ? a * Math.log(x) : NaN;
  }

  generateData(func: Function, a: number = 1): [number, number][] {
    return d3.range(0.1, 3.1, 0.1).map(x => [x, func(x, a)]);
  }

  updateGraph(data: [number, number][], color = this.currentColor): void {
    this.svg.selectAll('.line').remove();

    this.svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', this.currentColor)
      .attr('stroke-width', 2)
      .attr('d', this.line);
  }

  createGraph(): void {
    // Usando a referência ao svgElement após a visualização ser completamente inicializada
    this.svg = d3.select(this.svgElement.nativeElement);

    this.svg.append('g')
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.xScale));

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(this.yScale));

    this.line = d3.line()
      .x(d => this.xScale(d[0]))
      .y(d => this.yScale(d[1]));

    this.updateGraph(this.generateData(this.linearFunc, this.aValue));

    // Manipulação do slider com evento do Angular
    const slider = d3.select('#aRange');
    slider.on('input', (event: any) => {
      this.aValue = +event.target.value;
      d3.select('#aValue').text(this.aValue);
      this.updateGraph(this.generateData(this.currentFunc, this.aValue));
    });

    // Manipulação da seleção da função
    const chooseFunction = d3.select('#choose-function');
    chooseFunction.on('change', (event: any) => {
      const selectedValue = event.target.value;

      if (selectedValue === 'linear') {
        this.currentFunc = this.linearFunc;
        this.currentColor = 'green';
        this.updateGraph(this.generateData(this.currentFunc, this.aValue));
      } else if (selectedValue === 'exp') {
        this.currentFunc = this.expFunc;
        this.currentColor = 'orange';
        this.updateGraph(this.generateData(this.currentFunc, this.aValue));
      } else if (selectedValue === 'log') {
        this.currentFunc = this.logFunc;
        this.currentColor = 'red';
        this.updateGraph(this.generateData(this.currentFunc, this.aValue));
      }
    });
  }
}