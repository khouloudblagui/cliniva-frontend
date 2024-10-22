import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsPhyTreatmentComponent } from './view-details-phy-treatment.component';

describe('ViewDetailsPhyTreatmentComponent', () => {
  let component: ViewDetailsPhyTreatmentComponent;
  let fixture: ComponentFixture<ViewDetailsPhyTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailsPhyTreatmentComponent]
    });
    fixture = TestBed.createComponent(ViewDetailsPhyTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
