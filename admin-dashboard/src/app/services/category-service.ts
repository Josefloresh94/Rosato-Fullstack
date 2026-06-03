import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/categories/`;

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }
  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}${id}/`);
  }
  create(formData: FormData): Observable<Category> {
    return this.http.post<Category>(this.url, formData);
  }
  update(id: string, formData: FormData): Observable<Category> {
    return this.http.put<Category>(`${this.url}${id}/`, formData);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
