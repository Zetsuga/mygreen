import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorFicharComponent } from './trabajador-fichar.component';

describe('TrabajadorFicharComponent', () => {
  let component: TrabajadorFicharComponent;
  let fixture: ComponentFixture<TrabajadorFicharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadorFicharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadorFicharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
