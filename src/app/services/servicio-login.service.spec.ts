import { TestBed, inject } from '@angular/core/testing';

import { ServicioLoginService } from './servicio-login.service';

describe('ServicioLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioLoginService]
    });
  });

  it('should be created', inject([ServicioLoginService], (service: ServicioLoginService) => {
    expect(service).toBeTruthy();
  }));
});
