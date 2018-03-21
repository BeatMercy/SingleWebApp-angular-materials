import { TestBed, inject } from '@angular/core/testing';

import { ProductRetrieveService } from './product-retrieve.service';

describe('ProductRetrieveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductRetrieveService]
    });
  });

  it('should be created', inject([ProductRetrieveService], (service: ProductRetrieveService) => {
    expect(service).toBeTruthy();
  }));
});
