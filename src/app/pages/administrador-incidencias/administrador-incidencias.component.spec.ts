import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorIncidenciasComponent } from './administrador-incidencias.component';

describe('AdministradorIncidenciasComponent', () => {
  let component: AdministradorIncidenciasComponent;
  let fixture: ComponentFixture<AdministradorIncidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorIncidenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
