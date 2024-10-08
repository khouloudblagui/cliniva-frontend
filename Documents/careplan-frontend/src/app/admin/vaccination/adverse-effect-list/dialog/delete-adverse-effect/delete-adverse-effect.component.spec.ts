import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdverseEffectComponent } from './delete-adverse-effect.component';

describe('DeleteAdverseEffectComponent', () => {
  let component: DeleteAdverseEffectComponent;
  let fixture: ComponentFixture<DeleteAdverseEffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAdverseEffectComponent]
    });
    fixture = TestBed.createComponent(DeleteAdverseEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
