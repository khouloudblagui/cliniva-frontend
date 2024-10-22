import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebioanalysisComponent } from './updatebioanalysis.component';

describe('UpdatebioanalysisComponent', () => {
  let component: UpdatebioanalysisComponent;
  let fixture: ComponentFixture<UpdatebioanalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatebioanalysisComponent]
    });
    fixture = TestBed.createComponent(UpdatebioanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
