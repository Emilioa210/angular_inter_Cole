import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosAdminLoginComponent } from './cos-admin-login.component';

describe('CosAdminLoginComponent', () => {
  let component: CosAdminLoginComponent;
  let fixture: ComponentFixture<CosAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CosAdminLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CosAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
