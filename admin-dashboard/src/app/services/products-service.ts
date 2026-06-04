import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/products/`;

  // getAll(filters?: any): Observable<Product[]> {
  //   let params = new HttpParams();
  //   if (filters) {
  //     Object.keys(filters).forEach((key) => {
  //       if (filters[key]) params = params.append(key, filters[key]);
  //     });
  //   }
  //   return this.http.get<Product[]>(this.url, { params });
  // }
  getAll(): Observable<Product[]> {
      return this.http.get<Product[]>(this.url);
    }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}${id}/`);
  }
  create(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.url, formData);
  }
  update(id: string, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${`${this.url}${id}/`}`, formData);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
