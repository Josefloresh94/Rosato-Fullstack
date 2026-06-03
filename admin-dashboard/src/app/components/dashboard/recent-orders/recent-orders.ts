import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-recent-orders',
  imports: [MatCardModule, MatChipsModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header class="mb-4">
        <mat-card-title>Recent Orders</mat-card-title>
      </mat-card-header>
      <mat-card class="mx-4 mb-4 p-4" appearance="raised">
        <div class="flex items-center justify-between py-4 border-b border-border last:border-0">
          <div>
            <mat-card-title>ORD-001</mat-card-title>
            <p class="text-sm text-muted-foreground">2026-09-15</p>
          </div>
          <div class="text-right">
            <mat-card-subtitle>$199.99</mat-card-subtitle>
            <mat-chip size="small"> Delivered </mat-chip>
          </div>
        </div>
        <div class="flex items-center justify-between py-4 border-b border-border last:border-0">
          <div>
            <mat-card-title>ORD-001</mat-card-title>
            <p class="text-sm text-muted-foreground">2026-09-15</p>
          </div>
          <div class="text-right">
            <mat-card-subtitle>$199.99</mat-card-subtitle>
            <mat-chip size="small"> Delivered </mat-chip>
          </div>
        </div>
      </mat-card>
    </mat-card>
  `,
  styles: ``,
})
export class RecentOrders {}
