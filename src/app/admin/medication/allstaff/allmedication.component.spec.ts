import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllMedicationComponent } from "./allmedication.component";
describe("AllMedicationComponent", () => {
  let component: AllMedicationComponent;
  let fixture: ComponentFixture<AllMedicationComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AllMedicationComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
