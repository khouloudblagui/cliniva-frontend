import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsSymptomComponent } from './view-details-symptom.component';

describe('ViewDetailsSymptomComponent', () => {
  let component: ViewDetailsSymptomComponent;
  let fixture: ComponentFixture<ViewDetailsSymptomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailsSymptomComponent]
    });
    fixture = TestBed.createComponent(ViewDetailsSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
