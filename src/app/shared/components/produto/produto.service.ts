import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../utils/product';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = `${environment.UrlPrincipal}/api`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/product`);
  }

  getById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/` + id);
  }

  create(produto: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/add-produto`, produto);
  }

  delete(id: string): Observable<Product>{
    return this.http.delete<Product>(`${this.baseUrl}/` + id);
  }

  put(id: number, produto: Product){
    return this.http.put(`${this.baseUrl}/${id}`, produto);
  }
}
