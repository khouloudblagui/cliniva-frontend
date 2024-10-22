import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { EditSurgicalProcedureComponent } from "./edit-surgical procedure.component";

describe("EditSurgicalProcedureComponent", () => {
  let component: EditSurgicalProcedureComponent;
  let fixture: ComponentFixture<EditSurgicalProcedureComponent>;


  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditSurgicalProcedureComponent],
      }).compileComponents();
    })
  );


  beforeEach(() => {
    fixture = TestBed.createComponent(EditSurgicalProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
