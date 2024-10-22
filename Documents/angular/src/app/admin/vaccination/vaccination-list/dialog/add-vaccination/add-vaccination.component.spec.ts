import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVaccinationComponent } from './add-vaccination.component';

describe('AddVaccinationComponent', () => {
  let component: AddVaccinationComponent;
  let fixture: ComponentFixture<AddVaccinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVaccinationComponent]
    });
    fixture = TestBed.createComponent(AddVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
