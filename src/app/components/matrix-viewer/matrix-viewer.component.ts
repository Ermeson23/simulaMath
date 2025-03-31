import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-matrix-viewer',
  standalone: true,
  imports: [],
  templateUrl: './matrix-viewer.component.html',
  styleUrl: './matrix-viewer.component.scss'
})
export class MatrixViewerComponent {

  @Input() matrix: number[][] = [];
  @Input() variables: string[] = [];
  
  trackByIndex(index: number): number {
    return index;
  }
}
