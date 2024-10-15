import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BandejaEntradaPage } from './bandeja-entrada.page';

describe('BandejaEntradaPage', () => {
  let component: BandejaEntradaPage;
  let fixture: ComponentFixture<BandejaEntradaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaEntradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
