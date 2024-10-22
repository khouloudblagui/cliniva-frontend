import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergylistComponent } from './allergylist.component';

describe('AllergylistComponent', () => {
  let component: AllergylistComponent;
  let fixture: ComponentFixture<AllergylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergylistComponent]
    });
    fixture = TestBed.createComponent(AllergylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
