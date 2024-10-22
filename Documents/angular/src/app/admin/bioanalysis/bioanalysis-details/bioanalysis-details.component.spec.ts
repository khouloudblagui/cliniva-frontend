import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioanalysisDetailsComponent } from './bioanalysis-details.component';

describe('BioanalysisDetailsComponent', () => {
  let component: BioanalysisDetailsComponent;
  let fixture: ComponentFixture<BioanalysisDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioanalysisDetailsComponent]
    });
    fixture = TestBed.createComponent(BioanalysisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
