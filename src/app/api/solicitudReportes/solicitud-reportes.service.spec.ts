import { TestBed } from '@angular/core/testing';

import { SolicitudReportesService } from './solicitud-reportes.service';

describe('SolicitudReportesService', () => {
  let service: SolicitudReportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudReportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
