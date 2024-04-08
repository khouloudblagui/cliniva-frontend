import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllICD10sComponent } from "./allICD10s.component";
describe("AllICD10sComponent", () => {
  let component: AllICD10sComponent;
  let fixture: ComponentFixture<AllICD10sComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AllICD10sComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllICD10sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
