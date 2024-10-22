
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllSurgicalProceduresComponent } from "./allsurgicalprocedure.component";
describe("AllsurgicalprocedureComponent", () => {
  let component: AllSurgicalProceduresComponent;
  let fixture: ComponentFixture<AllSurgicalProceduresComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AllSurgicalProceduresComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllSurgicalProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
