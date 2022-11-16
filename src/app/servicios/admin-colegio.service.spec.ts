import { TestBed } from '@angular/core/testing';

import { AdminColegioService } from './admin-colegio.service';

describe('AdminColegioService', () => {
  let service: AdminColegioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminColegioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
