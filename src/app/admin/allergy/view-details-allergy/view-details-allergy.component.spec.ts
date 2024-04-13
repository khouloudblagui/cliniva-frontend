import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsAllergyComponent } from './view-details-allergy.component';

describe('ViewDetailsAllergyComponent', () => {
  let component: ViewDetailsAllergyComponent;
  let fixture: ComponentFixture<ViewDetailsAllergyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailsAllergyComponent]
    });
    fixture = TestBed.createComponent(ViewDetailsAllergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
