import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5000/api/curso_paralelo';
@Injectable({
  providedIn: 'root'
})
export class CursoParaleloService {

  constructor(private http: HttpClient) { }

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

  findByCursoParalelo(curso: any, paralelo:any, colegio:any): Observable<any>{
    return this.http.get(`${baseUrl}/xd/findCursoParalelo?curso=${curso}&paralelo=${paralelo}&colegio=${colegio}`);
  }
}
