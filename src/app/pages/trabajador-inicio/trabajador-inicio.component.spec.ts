import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorInicioComponent } from './trabajador-inicio.component';

describe('TrabajadorInicioComponent', () => {
  let component: TrabajadorInicioComponent;
  let fixture: ComponentFixture<TrabajadorInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadorInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadorInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
