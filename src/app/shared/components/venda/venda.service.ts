import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sales } from '../../utils/sales';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  baseUrl = `${environment.UrlPrincipal}/api/sales`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Sales[]>{
    return this.http.get<Sales[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Sales>{
    return this.http.get<Sales>(`${this.baseUrl}` + id);
  }

  create(sales: Sales): Observable<Sales>{
    return this.http.post<Sales>(`${this.baseUrl}`, sales);
  }

  delete(id: string): Observable<Sales>{
    return this.http.delete<Sales>(`${this.baseUrl}` + id);
  }

  put(id: number, sales: Sales){
    return this.http.put(`${this.baseUrl}/${id}`, sales);
  }
}
