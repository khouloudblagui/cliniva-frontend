import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalTreatmentListComponent } from './physical-treatment-list.component';

describe('PhysicalTreatmentListComponent', () => {
  let component: PhysicalTreatmentListComponent;
  let fixture: ComponentFixture<PhysicalTreatmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicalTreatmentListComponent]
    });
    fixture = TestBed.createComponent(PhysicalTreatmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
