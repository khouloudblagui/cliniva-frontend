import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdverseEffectComponent } from './add-adverse-effect.component';

describe('AddAdverseEffectComponent', () => {
  let component: AddAdverseEffectComponent;
  let fixture: ComponentFixture<AddAdverseEffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdverseEffectComponent]
    });
    fixture = TestBed.createComponent(AddAdverseEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
