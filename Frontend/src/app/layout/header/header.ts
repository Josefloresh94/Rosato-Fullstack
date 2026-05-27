import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from "../header-actions/header-actions";
import { Sidenav } from '../../services/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HeaderActions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  template: `
    <mat-toolbar class="w-full elevated py-2">
      <div class="max-w-300 mx-auto w-full flex items-center justify-between gap-4">
        <button
          matIconButton
          class="example-icon"
          aria-label="Toggle menu"
          (click)="sidenav.toggle()"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span>Rosato</span>
        <mat-form-field class="w-150 mx-auto mt-4">
          <mat-label>Search products...</mat-label>
          <input
            matInput
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearchChange($event)"
            placeholder="Search by name or description"
          />
          @if (searchTerm) {
            <button mat-icon-button matSuffix (click)="clearSearch()" aria-label="Clear search">
              <mat-icon>close</mat-icon>
            </button>
          }
        </mat-form-field>
        <!-- <span class="example-spacer"></span> -->
        <app-header-actions />
      </div>
      <div></div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {
  sidenav = inject(Sidenav);
  store = inject(EcommerceStore);

  searchTerm = '';

  // Signal para debounce (RxJS opcional)
  private searchSignal = signal('');

  onSearchChange(term: string) {
    this.searchTerm = term;
    // Con debounce simple (sin RxJS):
    // En producción usar debounceTime de RxJS
    this.store.setSearchTerm(term);
  }

  clearSearch() {
    this.searchTerm = '';
    this.store.setSearchTerm('');
  }
}
