import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileIngredientComponent } from './upload-file-ingredient.component';

describe('UploadFileIngredientComponent', () => {
  let component: UploadFileIngredientComponent;
  let fixture: ComponentFixture<UploadFileIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFileIngredientComponent]
    });
    fixture = TestBed.createComponent(UploadFileIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
