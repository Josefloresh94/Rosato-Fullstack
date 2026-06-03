import { Component } from '@angular/core';
import { Stats } from "../../components/dashboard/stats/stats";
import { RevenueMonth } from "../../components/reports/revenue-month/revenue-month";
import { SalesCategory } from "../../components/reports/sales-category/sales-category";

@Component({
  selector: 'app-reports',
  imports: [Stats, RevenueMonth, SalesCategory],
  template: `
    <div>
      <h1 class="text-4xl font-bold text-foreground mb-2">Rosato</h1>
      <p class="text-muted-foreground">
        Welcome back. Here's what's happening with your store today.
      </p>
    </div>
    <!-- Stats Grid -->
    <app-stats class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
      <!-- Revenue by Month -->
      <app-revenue-month />
      <!-- Sales by Category-->
      <app-sales-category />
    </div>
  `,
  styles: ``,
})
export default class Reports {}
