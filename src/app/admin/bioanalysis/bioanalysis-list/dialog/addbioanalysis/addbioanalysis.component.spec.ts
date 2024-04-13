import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbioanalysisComponent } from './addbioanalysis.component';

describe('AddbioanalysisComponent', () => {
  let component: AddbioanalysisComponent;
  let fixture: ComponentFixture<AddbioanalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddbioanalysisComponent]
    });
    fixture = TestBed.createComponent(AddbioanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
