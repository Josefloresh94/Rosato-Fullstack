import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Order, OrderStatus } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/orders/`;

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }
  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.url}${id}/`);
  }

  // PATCH optimizado para cambiar el estado desde el MatSelect de tu tabla
  updateStatus(id: string, status: OrderStatus): Observable<Order> {
    return this.http.patch<Order>(`${this.url}${id}/`, { status });
  }
}
