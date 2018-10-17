import { TestBed, inject } from '@angular/core/testing';

import { TenantsService } from './tenants.service';

describe('TenantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantsService]
    });
  });

  it('should be created', inject([TenantsService], (service: TenantsService) => {
    expect(service).toBeTruthy();
  }));
});
