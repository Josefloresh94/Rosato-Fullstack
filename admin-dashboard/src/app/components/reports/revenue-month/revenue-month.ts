import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-revenue-month',
  imports: [MatCardModule, MatProgressBarModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header class="mb-4">
        <mat-card-title>Revenue by Month</mat-card-title>
      </mat-card-header>
      <mat-card class="raised" class="mx-4 mb-4 p-4">
        <div class="py-4 border-b border-border last:border-0">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-foreground"> Enero </span>
            <span class="text-sm font-semibold text-primary"> $200 </span>
          </div>
          <mat-progress-bar mode="determinate" value="20"></mat-progress-bar>
        </div>
        <div class="py-4 border-b border-border last:border-0">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-foreground"> Febrero </span>
            <span class="text-sm font-semibold text-primary"> $300 </span>
          </div>
          <mat-progress-bar mode="determinate" value="30"></mat-progress-bar>
        </div>
        <div class="py-4 border-b border-border last:border-0">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-foreground"> Marzo </span>
            <span class="text-sm font-semibold text-primary"> $500 </span>
          </div>
          <mat-progress-bar mode="determinate" value="50"></mat-progress-bar>
        </div>
        <div class="py-4 border-b border-border last:border-0">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-foreground"> Aril </span>
            <span class="text-sm font-semibold text-primary"> $800 </span>
          </div>
          <mat-progress-bar mode="determinate" value="80"></mat-progress-bar>
        </div>
      </mat-card>
    </mat-card>
  `,
  styles: ``,
})
export class RevenueMonth {}
