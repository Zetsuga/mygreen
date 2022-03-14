import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonSliceComponent } from './boton-slice.component';

describe('BotonSliceComponent', () => {
  let component: BotonSliceComponent;
  let fixture: ComponentFixture<BotonSliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonSliceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonSliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
