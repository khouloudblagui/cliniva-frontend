import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsCategoryComponent } from './view-details-category.component';

describe('ViewDetailsCategoryComponent', () => {
  let component: ViewDetailsCategoryComponent;
  let fixture: ComponentFixture<ViewDetailsCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailsCategoryComponent]
    });
    fixture = TestBed.createComponent(ViewDetailsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
