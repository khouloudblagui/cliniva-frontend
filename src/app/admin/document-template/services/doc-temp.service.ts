import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { DocTemp } from '../model/DocTemp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocTempService {

  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8090';
  constructor(private http:HttpClient) { }
    // SideEffects List
    getAllDocTemp(): Observable<DocTemp[]> {
      return this.http.get<DocTemp[]>(this.apiServerUrl+"/docTemp/all");
    }
  
//delete vaccination
removeDocTemp(id:number): Observable<any>{
  return this.http.delete(this.apiServerUrl+"/docTemp/remove/"+id);
}
    
uploadDocument(formData: FormData): Observable<any> {
  return this.http.post<any>(this.apiServerUrl+"/docTemp/upload", formData);
}

  getDocTempById(id:any){
    return this.http.get<DocTemp>(this.apiServerUrl+"/docTemp/"+id);
  }

 /* updateDocument(documentId: number, title: string, description: string, format: string, parentElementType: string, parentElementKey: number): Observable<any> {
    const body = new HttpParams()
      .set('title', title)
      .set('description', description)
      .set('format', format)
      .set('parentElementType', parentElementType)
      .set('parentElementKey', parentElementKey.toString());
  
    return this.http.put(this.apiServerUrl + "/docTemp/" + documentId, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }*/
  updateDocument(documentId: number, formData: FormData): Observable<any> {
    return this.http.put(this.apiServerUrl + "/docTemp/" + documentId, formData);
  }
  
  

  downloadDocument(documentId: any): Observable<any> {
    // Make an HTTP GET request to download the document
    return this.http.get(this.apiServerUrl+"/docTemp/download/"+documentId, {
      responseType: 'arraybuffer' // Specify the response type as arraybuffer
    });
  }

  

  checkTitleExists(title: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/docTemp/checkTitleExists?title=${title}`);
  }
  
}
