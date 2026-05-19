import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header-actions',
  imports: [MatIcon, MatIconButton, MatButton, RouterLink, MatBadge],
  template: `
    <div class="flex items-center gap-2">
      <button
        matIconButton
        [matBadge]="store.wishlistCount()"
        [matBadgeHidden]="store.wishlistCount() === 0"
        routerLink="/wishlist"
      >
        <mat-icon>favorite</mat-icon>
      </button>
      <button
        matIconButton
        [matBadge]="store.cartCount()"
        [matBadgeHidden]="store.cartCount() === 0"
        routerLink="/cart"
      >
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button matButton>
        Sign In
      </button>
      <button matButton="filled">
        Sign Up
      </button>
    </div>
  `,
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);
}
