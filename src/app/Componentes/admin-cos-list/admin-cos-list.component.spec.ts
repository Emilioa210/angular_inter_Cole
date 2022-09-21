import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCosListComponent } from './admin-cos-list.component';

describe('AdminCosListComponent', () => {
  let component: AdminCosListComponent;
  let fixture: ComponentFixture<AdminCosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
