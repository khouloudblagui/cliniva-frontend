import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from './ingredient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private readonly API_URL = 'http://localhost:8090/ingredient';
  isTblLoading = true;
  //dataChange: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Ingredient;
  constructor(private httpClient: HttpClient) {}
  /*get data(): Ingredient[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }*/
  
  /** CRUD METHODS */
  getAllIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.API_URL);
  }
  
  checkIfIngredientExists(ingredientName: string): Observable<boolean> {
      return this.httpClient.get<boolean>(`${this.API_URL}/exists?ingredientName=${ingredientName}`);
    }

  addIngredient(ingredient: Ingredient): void {
    this.dialogData = ingredient;

  this.httpClient.post(this.API_URL + '/add', ingredient)
     .subscribe({
      next: (data) => {
        this.dialogData = ingredient;
       },
       error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
     });
  }

  addIngredientFile(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/upload-data`, formData);
  }
  
  updateIngredient(ingredientKy: number, updatedIngredient: any): Observable<void> {
    return this.httpClient.put<void>(`${this.API_URL}/edit/${ingredientKy}`, updatedIngredient);
  }
  deleteIngredient(ingredientKy: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${ingredientKy}`);
  }
  searchIngredient(ingredientName: string): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(`${this.API_URL}/search/${ingredientName}`);
  }
  
}
