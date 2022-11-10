import { TestBed } from '@angular/core/testing';

import { CursoParaleloService } from './curso-paralelo.service';

describe('CursoParaleloService', () => {
  let service: CursoParaleloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoParaleloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
