import { Component } from '@angular/core';
import { GraphComponent } from '../graph/graph.component';
import { MatrixSumComponent } from "../matrix-sum/matrix-sum.component";
import { SolverComponent } from "../solver/solver.component";

@Component({
    selector: 'app-simulator',
    imports: [GraphComponent, MatrixSumComponent, SolverComponent],
    templateUrl: './simulator.component.html',
    styleUrl: './simulator.component.scss'
})
export class SimulatorComponent {

}
