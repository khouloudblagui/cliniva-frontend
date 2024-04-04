import { MedicIngredientLink } from '../../models/MedicIngredientLink';
export class Ingredient {

  ingredientKy?:number;
  ingredientName: string;
  ingredientDesc: string;
  

  constructor(ingredient: Ingredient) {
    this.ingredientKy = ingredient.ingredientKy ;
    this.ingredientName = ingredient.ingredientName ;
    this.ingredientDesc = ingredient.ingredientDesc ;
  
  }
}


