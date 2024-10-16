import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudReportesPage } from './solicitud-reportes.page';

describe('SolicitudReportesPage', () => {
  let component: SolicitudReportesPage;
  let fixture: ComponentFixture<SolicitudReportesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
