import { Component } from '@angular/core';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [GraphComponent],
  templateUrl: './simulator.component.html',
  styleUrl: './simulator.component.scss'
})
export class SimulatorComponent {

}
