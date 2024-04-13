import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseEffectListComponent } from './adverse-effect-list.component';

describe('AdverseEffectListComponent', () => {
  let component: AdverseEffectListComponent;
  let fixture: ComponentFixture<AdverseEffectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdverseEffectListComponent]
    });
    fixture = TestBed.createComponent(AdverseEffectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
