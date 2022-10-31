import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5000/api/colegios';
@Injectable({
  providedIn: 'root'
})
export class ColegioService {

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

  findByNombre(nombre: any): Observable<any>{
    return this.http.get(`${baseUrl}/findOneNombre/${nombre}`);
  }

  findCursos(id:any): Observable<any>{
    return this.http.get(`${baseUrl}/findCursos/${id}`);
  }

  findParalelos(id:any): Observable<any>{
    return this.http.get(`${baseUrl}/findParalelos/${id}`);
  }

  findCursoParalelo(id:any): Observable<any>{
    return this.http.get(`${baseUrl}/findCursoParalelo/${id}`);
  }

  findParalelosPorCursos(colegio:any, curso:any): Observable<any>{
    return this.http.get(`${baseUrl}/xd/xd/findCursosParalelos?colegio=${colegio}&curso=${curso}`);
  }

}
