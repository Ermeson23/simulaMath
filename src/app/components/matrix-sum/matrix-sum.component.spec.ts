import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixSumComponent } from './matrix-sum.component';

describe('MatrixSumComponent', () => {
  let component: MatrixSumComponent;
  let fixture: ComponentFixture<MatrixSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixSumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
