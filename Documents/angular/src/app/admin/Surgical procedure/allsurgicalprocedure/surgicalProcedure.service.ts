import { Injectable } from '@angular/core';
import { surgicalprocedure } from './surgicalprocedure.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class surgicalProcedureService  {


 datachange :any;
 dialogData!: surgicalprocedure
 private readonly API_URL = 'http://localhost:8090/procedures';
  isTblLoading = true;
  data: any;

  constructor(private httpClient: HttpClient) {}

  getdialogData() {
    return this.dialogData;
  }

  getAllsurgicalprocedure(): Observable<surgicalprocedure[]> {
    return this.httpClient.get<surgicalprocedure[]>(this.API_URL);
  }
  checkIfSurgicalProcedureExists(cptCode: string): Observable<boolean> {
    // Utilisez `httpClient.get()` pour envoyer une requête GET à l'API_URL avec `cptCode` en paramètre de requête
    return this.httpClient.get<boolean>(`${this.API_URL}/${cptCode}`);
}


  addsurgicalprocedureFile(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/upload-data`, formData);
  }
  updatesurgicalprocedure(cptCode: string, newDescription: string, newcategory: string): void {
    console.log('update');
    // Construction de l'URL avec les paramètres
    const url = `${this.API_URL}/edit/${cptCode}/${newDescription}/${newcategory}`;
    // Création de l'objet contenant les données à envoyer
    const body = {
        cptCode: cptCode,
        newDescription: newDescription,
        newcategory: newcategory
    };
    console.log('donne  : ', body);
    // Envoyer la requête HTTP PUT
    this.httpClient.put(url, body).subscribe({
        next: (response) => {
            console.log('surgicalprocedure mis à jour avec succès : ', response);
            // Gérer la réponse si nécessaire
        },
        error: (error) => {
            console.error('Erreur lors de la mise à jour de surgicalprocedure : ', error);
            // Gérer l'erreur si nécessaire
        }
    });
}


  deletesurgicalprocedure(cptky: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${cptky}`);
  }
  searchsurgicalprocedure(surgicalprocedureName: string): Observable<surgicalprocedure[]> {
    return this.httpClient.get<surgicalprocedure[]>(`${this.API_URL}/search/${surgicalprocedureName}`);
  }
  addsurgicalprocedure(surgicalprocedure: surgicalprocedure): Observable<surgicalprocedure> {
    return this.httpClient.post<surgicalprocedure>(this.API_URL + '/add', surgicalprocedure);
}


}
