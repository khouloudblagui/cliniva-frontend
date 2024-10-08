import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalTreatmentCategoryComponent } from './physical-treatment-category.component';

describe('PhysicalTreatmentCategoryComponent', () => {
  let component: PhysicalTreatmentCategoryComponent;
  let fixture: ComponentFixture<PhysicalTreatmentCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicalTreatmentCategoryComponent]
    });
    fixture = TestBed.createComponent(PhysicalTreatmentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
