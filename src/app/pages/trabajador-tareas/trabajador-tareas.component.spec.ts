import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorTareasComponent } from './trabajador-tareas.component';

describe('TrabajadorTareasComponent', () => {
  let component: TrabajadorTareasComponent;
  let fixture: ComponentFixture<TrabajadorTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadorTareasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadorTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
