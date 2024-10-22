import { TestBed } from '@angular/core/testing';
import { InscribirVoluntarioService } from './inscribir-voluntario.service';

describe('InscribirVoluntarioService', () => {
  let service: InscribirVoluntarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscribirVoluntarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
