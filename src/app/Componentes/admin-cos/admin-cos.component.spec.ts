import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCosComponent } from './admin-cos.component';

describe('AdminCosComponent', () => {
  let component: AdminCosComponent;
  let fixture: ComponentFixture<AdminCosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
