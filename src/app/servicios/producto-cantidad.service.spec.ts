import { TestBed } from '@angular/core/testing';

import { ProductoCantidadService } from './producto-cantidad.service';

describe('ProductoCantidadService', () => {
  let service: ProductoCantidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoCantidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
