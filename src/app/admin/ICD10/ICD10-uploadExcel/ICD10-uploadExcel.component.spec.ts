import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ICD10uploadExcelComponent } from "./ICD10-uploadExcel.component";
describe("ICD10uploadExcelComponent", () => {
  let component: ICD10uploadExcelComponent;
  let fixture: ComponentFixture<ICD10uploadExcelComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ICD10uploadExcelComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ICD10uploadExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
