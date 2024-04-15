import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhytreatmentComponent } from './edit-phytreatment.component';

describe('EditPhytreatmentComponent', () => {
  let component: EditPhytreatmentComponent;
  let fixture: ComponentFixture<EditPhytreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPhytreatmentComponent]
    });
    fixture = TestBed.createComponent(EditPhytreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
