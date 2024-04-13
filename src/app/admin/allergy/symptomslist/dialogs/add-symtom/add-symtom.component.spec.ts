import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSymtomComponent } from './add-symtom.component';

describe('AddSymtomComponent', () => {
  let component: AddSymtomComponent;
  let fixture: ComponentFixture<AddSymtomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSymtomComponent]
    });
    fixture = TestBed.createComponent(AddSymtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
