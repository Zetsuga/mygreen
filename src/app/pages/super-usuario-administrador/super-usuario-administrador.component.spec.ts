import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUsuarioAdministradorComponent } from './super-usuario-administrador.component';

describe('SuperUsuarioAdministradorComponent', () => {
  let component: SuperUsuarioAdministradorComponent;
  let fixture: ComponentFixture<SuperUsuarioAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperUsuarioAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperUsuarioAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
