import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSuperadministradorComponent } from './super-superadministrador.component';

describe('SuperSuperadministradorComponent', () => {
  let component: SuperSuperadministradorComponent;
  let fixture: ComponentFixture<SuperSuperadministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperSuperadministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSuperadministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
