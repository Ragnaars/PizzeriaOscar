import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePaginaPage } from './detalle-pagina.page';

describe('DetallePaginaPage', () => {
  let component: DetallePaginaPage;
  let fixture: ComponentFixture<DetallePaginaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallePaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
