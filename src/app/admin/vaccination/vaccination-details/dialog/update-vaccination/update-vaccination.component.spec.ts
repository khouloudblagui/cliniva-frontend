import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVaccinationComponent } from './update-vaccination.component';

describe('UpdateVaccinationComponent', () => {
  let component: UpdateVaccinationComponent;
  let fixture: ComponentFixture<UpdateVaccinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateVaccinationComponent]
    });
    fixture = TestBed.createComponent(UpdateVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
