import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerce-store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-header-actions',
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink,
    MatBadge,
    MatMenu,
    MatDivider,
    MatMenuItem,
    MatMenuTrigger,
  ],
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
      @if (store.user(); as user) {
        <button matIconButton [matMenuTriggerFor]="userMenu">
          <img [src]="user.imageUrl" [alt]="user.name" class="w-8 h-8 rounded-full" />
        </button>

        <mat-menu #userMenu="matMenu" xPosition="before">
          <div class="flex flex-col px-3 min-w-50">
            <span class="text-sm font-medium">{{ user.name }}</span>
            <span class="text-xs text-gray-500">{{ user.email }}</span>
          </div>
          <mat-divider></mat-divider>
          <button class="min-h-8" mat-menu-item (click)="store.signOut()">
            <mat-icon>logout</mat-icon>
            Sign Out
          </button>
        </mat-menu>
      } @else {
        <button matButton (click)="openSignInDialog()">Sign In</button>
        <button matButton="filled" (click)="openSignUpDialog()">Sign Up</button>
      }
    </div>
  `,
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);

  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
      disableClose: true,
    });
  }
  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
    });
  }
}
