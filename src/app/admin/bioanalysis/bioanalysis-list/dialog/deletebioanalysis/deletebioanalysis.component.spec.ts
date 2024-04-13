import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebioanalysisComponent } from './deletebioanalysis.component';

describe('DeletebioanalysisComponent', () => {
  let component: DeletebioanalysisComponent;
  let fixture: ComponentFixture<DeletebioanalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletebioanalysisComponent]
    });
    fixture = TestBed.createComponent(DeletebioanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
