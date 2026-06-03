import { inject, Injectable } from '@angular/core';
import { Review } from '../models/review';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/reviews/`;

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.url);
  }

  getById(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.url}${id}/`);
  }

  create(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(this.url, review);
  }

  update(id: string, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(`${this.url}${id}/`, review);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
