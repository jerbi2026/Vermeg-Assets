import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { investissement } from './admin-invest/investissement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestService {

  constructor(private http: HttpClient) { }
  readonly API_URL = "http://localhost:3000";
  get_projects(): Observable<investissement[]>{
    return this.http.get<investissement[]>(this.API_URL+'/invest/v1');
  }
  get_project_by_id(id:number): Observable<investissement>{
    return this.http.get<investissement>(`${this.API_URL}/invest/v1/${id}`);
  }
  add_project(new_inv:investissement):Observable<void>{
    return this.http.post<void>(this.API_URL+'/invest/v2',new_inv);
  }
  delete_project_by_id(id:number):Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/invest/v3/${id}`);
  }
  update_project_name(id:number,new_name:string){
    return this.http.put<void>(`${this.API_URL}/invest/v4/${id}`,new_name);
  }

}
