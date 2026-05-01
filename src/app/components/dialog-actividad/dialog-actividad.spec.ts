import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActividad } from './dialog-actividad';

describe('DialogActividad', () => {
  let component: DialogActividad;
  let fixture: ComponentFixture<DialogActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogActividad],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
