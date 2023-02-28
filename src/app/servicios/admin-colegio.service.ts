import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt'

const baseUrl = 'http://localhost:5000/api/admins';

@Injectable({
  providedIn: 'root'
})
export class AdminColegioService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  getAll(): Observable<any>{
    return this.http.get(baseUrl);
  }
  get(id: any): Observable<any>{
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(baseUrl, data, { headers: headers });
  }

  update(id: any, data: any): Observable<any>{
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any>{
    return this.http.delete(baseUrl);
  }

  findOneColegio(colegio: any): Observable<any>{
    return this.http.get(`${baseUrl}/findOneColegio/${colegio}`);
  }
  singin(admin: any): Observable<any>{
    return this.http.post(`${baseUrl}/singin`, admin);
  }

  findByUsuario(usuario: any): Observable<any>{
    return this.http.get(`${baseUrl}/xd/findByUsuario/${usuario}`);
  }

  isAuth(): boolean{
    const token = localStorage.getItem('token')!;
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}
