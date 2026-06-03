import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '../../models/catalog';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";
import { Sidenav } from '../../services/sidenav';
import { Catalog } from '../../services/catalog';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButton,
  ],
  template: `
    <mat-sidenav-container class="h-full">
      <mat-sidenav mode="side" [opened]="sidenav.isOpen()">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>
          <mat-nav-list>
            @for (cat of categories(); track cat) {
              <mat-list-item
                [activated]="cat === category()"
                class="my-2"
                [routerLink]="['/products', cat]"
                (click)="sidenav.close()"
              >
                <span
                  matListItemTitle
                  class="font-medium"
                  [class]="cat === category() ? 'text-white!' : null"
                >
                  {{ cat | titlecase }}
                </span>
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ category() | titlecase }}</h1>
        <p class="text-base text-gray-600 mb-6">
          {{ store.filteredProducts().length }} products found
        </p>
        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
            <app-product-card [product]="product">
              <app-toggle-wishlist-button
                class="absolute! z-10 top-3 right-3"
                [product]="product"
                [style.view-transition-name]="'wishlist-button-' + product.id"
              />
            </app-product-card>
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid implements OnInit {
  private readonly catalogService = inject(Catalog);

  public products: Product[] = [];
  category = input<string>('all');
  sidenav = inject(Sidenav);
  store = inject(EcommerceStore);

  categories = signal<string[]>([
    'all',
    'electronics',
    'computers',
    'audio',
    'tablets',
    'cameras',
    'wearables',
    'gaming',
    'home',
    'e-readers',
    'televisions',
    'accessories',
    'drones',
    'appliances',
  ]);

  constructor() {
    this.store.setCategory(this.category);
  }

  ngOnInit(): void {
    this.catalogService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // Guardamos los productos reales de Django
        console.log('Productos cargados desde Django:', this.products);
      },
      error: (err) => {
        console.error('Error al conectar con el backend:', err);
      }
    });
  }
}
