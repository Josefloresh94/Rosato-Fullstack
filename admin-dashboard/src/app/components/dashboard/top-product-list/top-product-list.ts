import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-top-product-list',
  imports: [MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header class="mb-4">
        <mat-card-title>Top Products</mat-card-title>
      </mat-card-header>
      <mat-card class="mx-4 mb-4 p-4" appearance="outlined">
        <div class="flex items-center justify-between py-4 border-b border-border last:border-0">
          <div class="flex items-center gap-3">
            <mat-card class="w-12 h-12 flex items-center justify-center" appearance="raised">
              <mat-card-title class="title">1</mat-card-title>
            </mat-card>
            <div class="ml-4">
              <mat-card-title>Product Name</mat-card-title>
              <mat-card-subtitle>Product Category</mat-card-subtitle>
            </div>
          </div>
          <h3 class="font-semibold text-primary">$199.99</h3>
        </div>
        <div class="flex items-center justify-between py-4 border-b border-border last:border-0">
          <div class="flex items-center gap-3">
            <mat-card class="w-12 h-12 flex items-center justify-center" appearance="raised">
              <mat-card-title class="title">1</mat-card-title>
            </mat-card>
            <div class="ml-4">
              <mat-card-title>Product Name</mat-card-title>
              <mat-card-subtitle>Product Category</mat-card-subtitle>
            </div>
          </div>
          <h3 class="font-semibold text-primary">$199.99</h3>
        </div>
        <div class="flex items-center justify-between py-4 border-b border-border last:border-0">
          <div class="flex items-center gap-3">
            <mat-card class="w-12 h-12 flex items-center justify-center" appearance="raised">
              <mat-card-title class="title">1</mat-card-title>
            </mat-card>
            <div class="ml-4">
              <mat-card-title>Product Name</mat-card-title>
              <mat-card-subtitle >Product Category</mat-card-subtitle>
            </div>
          </div>
          <h3 class="font-semibold text-primary">$199.99</h3>
        </div>
      </mat-card>
    </mat-card>
  `,
  styles: `
    :host ::ng-deep .title {
      color: var(--mat-sys-primary) !important;
    }
  `,
})
export class TopProductList {}
