import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-stats',
  imports: [MatIcon, MatCardModule],
  template: `
    <mat-card class="p-6" appearance="raised">
      <div class="flex items-start justify-between mb-4">
        <div>
          <p class="text-sm text-muted-foreground mb-2">Total Sales</p>
          <p class="text-3xl font-bold text-foreground">$1000</p>
        </div>
        <mat-icon class="text-green-500" aria-hidden="true">trending_up</mat-icon>
      </div>
      <p class="text-xs text-muted-foreground">Updated today</p>
    </mat-card>
    <mat-card class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <p class="text-sm text-muted-foreground mb-2">Total Orders</p>
          <p class="text-3xl font-bold text-foreground">2</p>
        </div>
        <mat-icon class="text-green-500 material-icons-outlined" aria-hidden="true"
          >inventory_2</mat-icon
        >
      </div>
      <p class="text-xs text-muted-foreground">Updated today</p>
    </mat-card>
    <mat-card class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <p class="text-sm text-muted-foreground mb-2">Products</p>
          <p class="text-3xl font-bold text-foreground">6</p>
        </div>
        <mat-icon class="text-green-500" aria-hidden="true">view_in_ar</mat-icon>
      </div>
      <p class="text-xs text-muted-foreground">Updated today</p>
    </mat-card>
    <mat-card class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <p class="text-sm text-muted-foreground mb-2">Acg Order Value</p>
          <p class="text-3xl font-bold text-foreground">$70</p>
        </div>
        <mat-icon class="text-green-500 material-icons-outlined" aria-hidden="true"
          >remove_red_eye</mat-icon
        >
      </div>
      <p class="text-xs text-muted-foreground">Updated today</p>
    </mat-card>
  `,
  styles: ``,
})
export class Stats {}
