import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header-actions',
  imports: [MatIcon, MatIconButton, MatButton, RouterLink],
  template: `
    <div class="flex items-center gap-2">
      <button
        matIconButton
        routerLink="/wishlist"
        class="example-icon favorite-icon"
        aria-label="Example icon-button with heart icon"
      >
        <mat-icon>favorite</mat-icon>
      </button>
      <button
        matIconButton
        class="example-icon favorite-icon"
        aria-label="Example icon-button with heart icon"
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
export class HeaderActions {}
