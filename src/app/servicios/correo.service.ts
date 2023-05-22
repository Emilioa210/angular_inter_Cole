import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5000/api/correo';
@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http: HttpClient) { }

  sendMessage (body:any): Observable<any>{
    return this.http.post(`${baseUrl}/envio`, body);
  }
}