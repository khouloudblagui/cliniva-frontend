import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSymtomComponent } from './edit-symtom.component';

describe('EditSymtomComponent', () => {
  let component: EditSymtomComponent;
  let fixture: ComponentFixture<EditSymtomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSymtomComponent]
    });
    fixture = TestBed.createComponent(EditSymtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
