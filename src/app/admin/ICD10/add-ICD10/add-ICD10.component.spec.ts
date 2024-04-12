import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddICD10Component } from "./add-ICD10.component";
describe("AddICD10Component", () => {
  let component: AddICD10Component;
  let fixture: ComponentFixture<AddICD10Component>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddICD10Component],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddICD10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
