import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Listar2Page } from './listar2.page';

describe('Listar2Page', () => {
  let component: Listar2Page;
  let fixture: ComponentFixture<Listar2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Listar2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
