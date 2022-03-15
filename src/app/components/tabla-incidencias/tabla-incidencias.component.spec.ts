import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaIncidenciasComponent } from './tabla-incidencias.component';

describe('TablaIncidenciasComponent', () => {
  let component: TablaIncidenciasComponent;
  let fixture: ComponentFixture<TablaIncidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaIncidenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
