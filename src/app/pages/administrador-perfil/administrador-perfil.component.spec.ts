import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorPerfilComponent } from './administrador-perfil.component';

describe('AdministradorPerfilComponent', () => {
  let component: AdministradorPerfilComponent;
  let fixture: ComponentFixture<AdministradorPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
