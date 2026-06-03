import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-sales-category',
  imports: [MatCardModule, MatProgressBarModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header class="mb-4">
        <mat-card-title>Sales by Category</mat-card-title>
      </mat-card-header>
      <mat-card class="raised" class="mx-4 mb-4 p-4">
        <div class="py-4 border-b border-border last:border-0">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-medium text-foreground"> Dresses </span>
            <span class="text-sm font-semibold text-primary"> 35% </span>
          </div>
          <mat-progress-bar class="mb-2" mode="determinate" value="35"></mat-progress-bar>
          <span>$1260</span>
        </div>
        <div class="py-4 border-b border-border last:border-0">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-medium text-foreground"> Tops </span>
            <span class="text-sm font-semibold text-primary"> 25% </span>
          </div>
          <mat-progress-bar class="mb-2" mode="determinate" value="30"></mat-progress-bar>
          <span>$900</span>
        </div>
        <div class="py-4 border-b border-border last:border-0">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-medium text-foreground"> Bottoms </span>
            <span class="text-sm font-semibold text-primary"> 20% </span>
          </div>
          <mat-progress-bar class="mb-2" mode="determinate" value="20"></mat-progress-bar>
          <span>$720</span>
        </div>
        <div class="py-4 border-b border-border last:border-0">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-medium text-foreground"> Outerwear </span>
            <span class="text-sm font-semibold text-primary"> 15% </span>
          </div>
          <mat-progress-bar class="mb-2" mode="determinate" value="15"></mat-progress-bar>
          <span>$540</span>
        </div>
        <div class="py-4 border-b border-border last:border-0">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-medium text-foreground"> Accessories </span>
            <span class="text-sm font-semibold text-primary"> 5% </span>
          </div>
          <mat-progress-bar class="mb-2" mode="determinate" value="5"></mat-progress-bar>
          <span>$180</span>
        </div>
      </mat-card>
    </mat-card>
  `,
  styles: ``,
})
export class SalesCategory {}
