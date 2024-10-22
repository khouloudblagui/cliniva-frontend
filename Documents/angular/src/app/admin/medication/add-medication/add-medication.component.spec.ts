import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddMedicationComponent } from "./add-medication.component";
describe("AddMedicationComponent", () => {
  let component: AddMedicationComponent;
  let fixture: ComponentFixture<AddMedicationComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddMedicationComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
