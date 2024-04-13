import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSymtomComponent } from './delete-symtom.component';

describe('DeleteSymtomComponent', () => {
  let component: DeleteSymtomComponent;
  let fixture: ComponentFixture<DeleteSymtomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSymtomComponent]
    });
    fixture = TestBed.createComponent(DeleteSymtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
