import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddIngredientComponent } from "./add-ingredient.component";
describe("AddIngredientComponent", () => {
  let component: AddIngredientComponent;
  let fixture: ComponentFixture<AddIngredientComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddIngredientComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
