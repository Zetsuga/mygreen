import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorInicioComponent } from './administrador-inicio.component';

describe('AdministradorInicioComponent', () => {
  let component: AdministradorInicioComponent;
  let fixture: ComponentFixture<AdministradorInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
