import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Stock } from '../../utils/stock';


@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  baseUrl = `${environment.UrlPrincipal}/api/stock`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Stock[]>{
    console.log("teste");
    return this.http.get<Stock[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Stock>{
    return this.http.get<Stock>(`${this.baseUrl}` + id);
  }

  create(estoque: Stock): Observable<Stock>{
    return this.http.post<Stock>(`${this.baseUrl}`, estoque);
  }

  delete(id: string): Observable<Stock>{
    return this.http.delete<Stock>(`${this.baseUrl}` + id);
  }

  put(id: number, estoque: Stock){
    return this.http.put(`${this.baseUrl}/${id}`, estoque);
  }
}
