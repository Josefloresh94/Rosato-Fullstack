import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/users/`;

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}${id}/`);
  }

  create(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  update(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.url}${id}/`, user);
  }

  // PATCH optimizado para la funcionalidad de bloquear/desbloquear (is_active)
  toggleActiveStatus(id: string, isActive: boolean): Observable<User> {
    return this.http.patch<User>(`${this.url}${id}/`, { is_active: isActive });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
