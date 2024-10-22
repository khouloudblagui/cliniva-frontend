import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioanalysisListComponent } from './bioanalysis-list.component';

describe('BioanalysisListComponent', () => {
  let component: BioanalysisListComponent;
  let fixture: ComponentFixture<BioanalysisListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioanalysisListComponent]
    });
    fixture = TestBed.createComponent(BioanalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
