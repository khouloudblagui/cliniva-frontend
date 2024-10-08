import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdverseEffectComponent } from './update-adverse-effect.component';

describe('UpdateAdverseEffectComponent', () => {
  let component: UpdateAdverseEffectComponent;
  let fixture: ComponentFixture<UpdateAdverseEffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAdverseEffectComponent]
    });
    fixture = TestBed.createComponent(UpdateAdverseEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
