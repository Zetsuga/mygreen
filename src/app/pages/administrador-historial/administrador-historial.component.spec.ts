import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorHistorialComponent } from './administrador-historial.component';

describe('AdministradorHistorialComponent', () => {
  let component: AdministradorHistorialComponent;
  let fixture: ComponentFixture<AdministradorHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
