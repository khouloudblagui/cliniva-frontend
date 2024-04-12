import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { EditICD10Component } from "./edit-ICD10.component";
describe("EditICD10Component", () => {
  let component: EditICD10Component;
  let fixture: ComponentFixture<EditICD10Component>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditICD10Component],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(EditICD10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
