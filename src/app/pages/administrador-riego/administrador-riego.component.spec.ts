import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorRiegoComponent } from './administrador-riego.component';

describe('AdministradorRiegoComponent', () => {
  let component: AdministradorRiegoComponent;
  let fixture: ComponentFixture<AdministradorRiegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorRiegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorRiegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
