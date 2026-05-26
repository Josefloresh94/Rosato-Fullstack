import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product';
import { MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, MatButton, MatIcon, RouterLink, StarRating],
  template: `
    <div
      class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        [src]="product().imageUrl"
        [alt]="product().name"
        class="w-full h-full object-cover rounded-t-xl"
        [style.view-transition-name]="'product-image-' + product().id"
        [routerLink]="['/product', product().id]"
      />
      <ng-content />
      <div class="p-5 flex flex-col flex-1" [routerLink]="['/product', product().id]">
        <h2 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">{{ product().name }}</h2>
        <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">{{ product().description }}</p>
        <app-star-rating class="mb-3" [rating]="product().rating">
          ({{product().reviewCount}})
        </app-star-rating>
        <div class="text-sm font-medium mb-4">
          {{ product().inStock ? 'In Stock' : 'Out of Stock' }}
        </div>
        <div class="flex items-center justify-between mt-auto">
          <span class="text-xl font-bold text-gray-900"> {{ product().price | currency }}</span>
          <button
            matButton="filled"
            class="flex items-center gap-2"
            (click)="store.addToCart(product())"
            [disabled]="!product().inStock"
          >
            <mat-icon>shopping_cart</mat-icon>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCard {
  product = input.required<Product>();
  store = inject(EcommerceStore);
}
