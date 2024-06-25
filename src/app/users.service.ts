import { registration } from './sign-in/registration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from './sign-in/users';
import { todo } from './todo';
import * as CryptoJS from 'crypto-js';
import { transaction } from './notification/transaction';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  username_sign_up = '';
  password_sign_up= '';
  place_sign_up= '';
  image_sign_up='';
  numero_sign_up=0;
  date_sign_up='';
  readonly API_URL = "http://localhost:3000";
  secret_key='C25aG89sH63JdZpW';

  nombre_actions_total=0;
 

  constructor(private http: HttpClient) {} 

  get_users(): Observable<users[]>{
    return this.http.get<users[]>(this.API_URL+'/v1');
  }
  get_passwords():Observable<string[]>{
    return this.http.get<string[]>(this.API_URL+'/v5');
  }
  update_password(id:number , pass:String):Observable<users>{
    return this.http.put<users>(`${this.API_URL}/v6/${id}`,pass);
  }
  add_registration(r : registration):Observable<void>{
    return this.http.post<void>(this.API_URL+'/registration/v2',r);
  }

  get_registration():Observable<registration[]>{
    return this.http.get<registration[]>(this.API_URL+'/registration/v1')
  }
  delete_registration_by_id(email:string):Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/registration/v3/${email}`);
  }


  delete_user_by_id(id:number):Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/v3/${id}`);
  }

  get_user_by_id(id:number):Observable<users>{
    return this.http.get<users>(`${this.API_URL}/v1/${id}`);
  }
  update_user_by_id(id:number , user:users):Observable<users>{
    return this.http.put<users>(`${this.API_URL}/v4/${id}`,user);
  }

  add_user(user : users): Observable<void>{
    return this.http.post<void>(this.API_URL+'/v2',user);
  }
  get_tasks():Observable<todo[]>{
    return this.http.get<todo[]>(this.API_URL+'/task/v1');
  }
  delete_task_by_id(id:number):Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/task/v2/${id}`);
  }
  delete_all_tasks():Observable<void>{
    return this.http.delete<void>(this.API_URL+'/task/v2');
  }
  update_task(id:number , task:String):Observable<todo>{
    return this.http.put<todo>(`${this.API_URL}/task/v3/${id}`,task);
  }
  add_task(task : todo): Observable<void>{
    return this.http.post<void>(this.API_URL+'/task/v4',task);
  }
  encryptString(message: string, secretKey: string): string {
    const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
    return encryptedMessage;
  }
  decryptString(encryptedMessage: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  }



  get_transactions():Observable<transaction[]>{
    return this.http.get<transaction[]>(this.API_URL+'/transaction/v1');
  }
  add_transaction(new_trans:transaction):Observable<void>{
    return this.http.post<void>(this.API_URL+'/transaction/v2',new_trans);
  }

  delete_transaction_by_id(id:number):Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/transaction/v3/${id}`);
  }

  
  

  
  
  


  
 

}
