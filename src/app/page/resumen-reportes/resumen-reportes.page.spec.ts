import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenReportesPage } from './resumen-reportes.page';

describe('ResumenReportesPage', () => {
  let component: ResumenReportesPage;
  let fixture: ComponentFixture<ResumenReportesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
