import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixViewerComponent } from './matrix-viewer.component';

describe('MatrixViewerComponent', () => {
  let component: MatrixViewerComponent;
  let fixture: ComponentFixture<MatrixViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
