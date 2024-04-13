import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVaccinationComponent } from './delete-vaccination.component';

describe('DeleteVaccinationComponent', () => {
  let component: DeleteVaccinationComponent;
  let fixture: ComponentFixture<DeleteVaccinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteVaccinationComponent]
    });
    fixture = TestBed.createComponent(DeleteVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
