import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { ICD10 } from './ICD10.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ICD10Service  {
  
  private readonly API_URL = 'http://localhost:8090/icd10'; // Remplacez cette URL par l'URL de votre backend Spring Boot
  dataChange: any;
  dialogData!: ICD10 
  isTblLoading =true;
 

  constructor(private http: HttpClient) { }
  get data(): ICD10[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllICD10(): Observable<ICD10[]> {
    return this.http.get<ICD10[]>(this.API_URL);}
    /*.pipe
   (
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      if (error.status !== undefined && error.message !== undefined) {
        errorMessage = `Code d'erreur : ${error.status}, message : ${error.message}`;
      } else {
        errorMessage = `Une erreur inattendue est survenue`;
      }
    }
    console.error(errorMessage); // Journaliser l'erreur dans la console
    return throwError(errorMessage);
  }
  */
  /*private readonly API_URL = 'http://localhost:8090';
  readonly EndPointICD10 ="/icd10/all"
  isTblLoading = true;
  dataChange: BehaviorSubject<ICD10[]> = new BehaviorSubject<ICD10[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: ICD10;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): ICD10[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllIcd10ss():Observable<ICD10[]> {
    return this.httpClient.get<ICD10[]>(this.API_URL+this.EndPointICD10)
  }*/
  /** CRUD METHODS */
 /* getAllICD10ss(): void {
    this.subs.sink = this.httpClient.get<ICD10[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }*/
  addICD10s(iCode: string, iDescription: string, iNotes: string): void {
    // Validation des paramètres
    if (!iCode || !iDescription || !iNotes) {
        console.error('Les paramètres sont manquants.');
        return;
    }

    // Encodage des paramètres
    const encodedCode = encodeURIComponent(iCode);
    const encodedDescription = encodeURIComponent(iDescription);
    const encodedNotes = encodeURIComponent(iNotes);

    // Construction de l'URL avec les paramètres encodés
    const url = `http://localhost:8090/icd10/add/${encodedCode}/${encodedDescription}/${encodedNotes}`;

    // Envoyer la requête HTTP
    this.http.post(url, null).subscribe({
        next: (response) => {
            console.log('ICD10 ajouté avec succès : ', response);
            // Gérer la réponse si nécessaire
        },
        error: (error) => {
            console.error('Erreur lors de l\'ajout de l\'ICD10 : ', error);
            // Gérer l'erreur si nécessaire
        }
    });
}



removeICD10(icd10code: string): Observable<void> {
  return this.http.delete<void>(`${this.API_URL}/delete/${icd10code}`);
}



    // this.httpClient.post(this.API_URL, ICD10s)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = ICD10s;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  
 




    updateICD10s(iCode: string, newDescription: string, newNotes: string): void {
      // Construction de l'URL avec les paramètres
      const url = `${this.API_URL}/edit/${iCode}/${newDescription}/${newNotes}`;
  
      // Création de l'objet contenant les données à envoyer
      const body = {
          iCode: iCode,
          newDescription: newDescription,
          newNotes: newNotes
      };
      console.log('donne  : ', body);
      // Envoyer la requête HTTP PUT
      this.http.put(url, body).subscribe({
          next: (response) => {
              console.log('ICD10 mis à jour avec succès : ', response);
              // Gérer la réponse si nécessaire
          },
          error: (error) => {
              console.error('Erreur lors de la mise à jour de l\'ICD10 : ', error);
              // Gérer l'erreur si nécessaire
          }
      });
  }
  
    // this.httpClient.put(this.API_URL + ICD10s.id, ICD10s)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = ICD10s;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
 
  deleteICD10(icode: string): Observable<void>  {
    return this.http.delete<void>(`${this.API_URL}/delete/${icode}`);
    console.log(icode);
   }
    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  
    checkIfIcd10Exists(icd10Code: string): Observable<boolean> {
      return this.http.get<boolean>(`${this.API_URL}/exists?icd10Code=${icd10Code}`);
    }

    addICD10File(formData: FormData): Observable<any> {
      return this.http.post(`${this.API_URL}/upload`, formData);
    }

}
