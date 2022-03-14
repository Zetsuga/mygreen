import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorParteComponent } from './administrador-parte.component';

describe('AdministradorParteComponent', () => {
  let component: AdministradorParteComponent;
  let fixture: ComponentFixture<AdministradorParteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorParteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
