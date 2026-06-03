import { Component } from '@angular/core';
import { Stats } from "../../components/dashboard/stats/stats";
import { RecentOrders } from "../../components/dashboard/recent-orders/recent-orders";
import { TopProductList } from "../../components/dashboard/top-product-list/top-product-list";

@Component({
  selector: 'app-dashboard',
  imports: [Stats, RecentOrders, TopProductList],
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
      <!-- Recent Orders -->
      <app-recent-orders />
      <!-- Top Products -->
      <app-top-product-list/>
    </div>
  `,
  styles: ``,
})
export default class Dashboard {}
