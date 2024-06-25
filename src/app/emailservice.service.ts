import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { email } from './sign-in/email';
@Injectable({
  providedIn: 'root'
})
export class EmailserviceService {

  readonly API_URL = "https://localhost:5000";

  constructor(private http: HttpClient) {} 
  send_mail_with_attachment(e:email):Observable<void>{
    return this.http.post<void>(this.API_URL+'/sendMailWithAttachment',e);
 }
 send_mail(e:email):Observable<void>{
    return this.http.post<void>(this.API_URL+'/sendMail',e);
 }
}
