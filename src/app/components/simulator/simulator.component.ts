import { Component } from '@angular/core';
import { GraphComponent } from '../graph/graph.component';
import { MatrixSumComponent } from "../matrix-sum/matrix-sum.component";

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [GraphComponent, MatrixSumComponent],
  templateUrl: './simulator.component.html',
  styleUrl: './simulator.component.scss'
})
export class SimulatorComponent {

}
