import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdministradorComponent } from './super-administrador.component';

describe('SuperAdministradorComponent', () => {
  let component: SuperAdministradorComponent;
  let fixture: ComponentFixture<SuperAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
