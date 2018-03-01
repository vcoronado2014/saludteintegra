import { TestBed, inject } from '@angular/core/testing';

import { ContratanteService } from './contratante.service';

describe('ContratanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContratanteService]
    });
  });

  it('should be created', inject([ContratanteService], (service: ContratanteService) => {
    expect(service).toBeTruthy();
  }));
});
