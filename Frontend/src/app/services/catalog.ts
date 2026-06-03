import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/catalog';

@Injectable({
  providedIn: 'root',
})
export class Catalog {
  // Define la URL base de tu servidor Django local
  private readonly API_URL = 'http://127.0.0.1:8000/api/productos/';

  // Inyección moderna de Angular para HttpClient
  private readonly http = inject(HttpClient);

  // 1. Obtener todos los productos activos
  getProducts(categorySlug?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (categorySlug) {
      // DRF permite filtrar automáticamente si configuras filtros, o puedes capturar el parámetro
      params = params.set('category__slug', categorySlug);
    }
    return this.http.get<Product[]>(this.API_URL, { params });
  }

  // 2. Obtener un solo producto por su ID para la vista de detalle
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}${id}/`);
  }
}
