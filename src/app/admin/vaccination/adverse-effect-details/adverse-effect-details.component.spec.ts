import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseEffectDetailsComponent } from './adverse-effect-details.component';

describe('AdverseEffectDetailsComponent', () => {
  let component: AdverseEffectDetailsComponent;
  let fixture: ComponentFixture<AdverseEffectDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdverseEffectDetailsComponent]
    });
    fixture = TestBed.createComponent(AdverseEffectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
