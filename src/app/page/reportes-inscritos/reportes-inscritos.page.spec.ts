import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportesInscritosPage } from './reportes-inscritos.page';

describe('ReportesInscritosPage', () => {
  let component: ReportesInscritosPage;
  let fixture: ComponentFixture<ReportesInscritosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesInscritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
