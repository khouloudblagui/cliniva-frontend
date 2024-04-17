import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { surgicalprocedureuploadComponent } from "./surgicalprocedure-upload.component";
describe("surgicalprocedureuploadComponent", () => {
  let component: surgicalprocedureuploadComponent;
  let fixture: ComponentFixture<surgicalprocedureuploadComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [surgicalprocedureuploadComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(surgicalprocedureuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
