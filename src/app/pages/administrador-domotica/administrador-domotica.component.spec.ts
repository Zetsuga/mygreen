import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorDomoticaComponent } from './administrador-domotica.component';

describe('AdministradorDomoticaComponent', () => {
  let component: AdministradorDomoticaComponent;
  let fixture: ComponentFixture<AdministradorDomoticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorDomoticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorDomoticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
