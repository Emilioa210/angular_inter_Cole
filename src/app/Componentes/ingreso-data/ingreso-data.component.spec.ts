import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoDataComponent } from './ingreso-data.component';

describe('IngresoDataComponent', () => {
  let component: IngresoDataComponent;
  let fixture: ComponentFixture<IngresoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
