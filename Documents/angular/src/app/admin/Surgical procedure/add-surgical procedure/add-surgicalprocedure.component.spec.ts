import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddSurgicalProcedureComponent } from './add-surgicalprocedure.component';

describe('AddSurgicalProcedureComponent', () => {
  let component: AddSurgicalProcedureComponent;
  let fixture: ComponentFixture<AddSurgicalProcedureComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddSurgicalProcedureComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSurgicalProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
