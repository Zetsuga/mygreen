import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorUsuariosComponent } from './administrador-usuarios.component';

describe('AdministradorUsuariosComponent', () => {
  let component: AdministradorUsuariosComponent;
  let fixture: ComponentFixture<AdministradorUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
