import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePagina2Page } from './detalle-pagina2.page';

describe('DetallePagina2Page', () => {
  let component: DetallePagina2Page;
  let fixture: ComponentFixture<DetallePagina2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallePagina2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
