import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataReceptorComponent } from './data-receptor.component';

describe('DataReceptorComponent', () => {
  let component: DataReceptorComponent;
  let fixture: ComponentFixture<DataReceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataReceptorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataReceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
