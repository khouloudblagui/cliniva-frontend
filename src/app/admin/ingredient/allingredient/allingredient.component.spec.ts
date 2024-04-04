import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllIngredientComponent } from "./allingredient.component";
describe("AllIngredientComponent", () => {
  let component: AllIngredientComponent;
  let fixture: ComponentFixture<AllIngredientComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AllIngredientComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
