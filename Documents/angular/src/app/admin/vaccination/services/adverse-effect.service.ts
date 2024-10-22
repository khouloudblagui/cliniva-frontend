import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AdverseEffect } from '../model/vaccination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdverseEffectService {
  
  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8090';
  constructor(private http:HttpClient) { }
    // SideEffects List
    getSideEffects(): Observable<AdverseEffect[]> {
      return this.http.get<AdverseEffect[]>(this.apiServerUrl+"/adverseEffect/all");
    }
  
    //delete SideEffects
    removeSideEffects(id:any): Observable<any>{
      return this.http.delete(this.apiServerUrl+"/adverseEffect/delete/"+id);
    }
  // SideEffects List
  createSideEffects(model:AdverseEffect): Observable<any>{
    return this.http.post(this.apiServerUrl+"/adverseEffect/add",model);
  }

  getSideEffectsById(id:any){
    return this.http.get<AdverseEffect>(this.apiServerUrl+"/adverseEffect/search/"+id);
  }

  updateSideEffects(model:AdverseEffect,id:number): Observable<any>{
    return this.http.put(this.apiServerUrl+"/adverseEffect/update/"+id,model);
  }

}
