import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSymptomComponent } from './edit-symptom.component';

describe('EditSymptomComponent', () => {
  let component: EditSymptomComponent;
  let fixture: ComponentFixture<EditSymptomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSymptomComponent]
    });
    fixture = TestBed.createComponent(EditSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
