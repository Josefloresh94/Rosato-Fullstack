import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
@Component({
  selector: 'app-orders',
  imports: [MatButtonModule, TitleCasePipe, MatIcon],
  template: `
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-foreground mb-2">Orders</h1>
      <p class="text-muted-foreground">
        Manage your store's products. Add new products, edit existing ones, and keep your inventory
        up to date.
      </p>
    </div>
    <!-- Status Filter -->
    <div class="flex gap-3 mb-8 pb-2">
      @for (status of statuses; track $index) {
        <button matFab extended class="mr-2">
          {{ status === 'all' ? 'All Orders' : (status | titlecase) }}
        </button>
      }
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Order List -->
      <div class="lg:col-span-2">
        <div class="bg-card border border-border rounded-lg overflow-hidden">
          <!-- @if () { -->
          <div class="p-12 text-center text-muted-foreground">
            <p>No orders Found</p>
          </div>
          <!-- } @else { -->
          <div class="divide-y divide-border">
            <button
              class="w-full p-6 flex flex-row items-center justify-between hover:bg-muted/50 transition-colors text-left"
            >
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <mat-icon>view_in_ar</mat-icon>
                  <p class="font-semibold text-foreground">ORD-001</p>
                </div>
                <p class="text-sm text-muted-foreground">1 item * $1000</p>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-xs px-3 py-1 rounded-full font-medium">Delivered</span>
                <mat-icon>keyboard_arrow_right</mat-icon>
              </div>
            </button>
          </div>
          <!-- } -->
        </div>
      </div>

      <!-- Order Details -->
      <div class="lg-cols-span-1">
        <div class="bg-card border border-border rounded-lg p-12 text-center text-muted-foreground">
          <mat-icon>view_in_ar</mat-icon>
          <p>Select an order to view details</p>
        </div>
        <div class="bg-card border border-border rounded-lg p-6 sticky top-8">
          <h2 class="font-semibold text-lg text-foreground mb-6">Order Details</h2>

          <div class="space-y-6">
            <!--  Order Number -->
            <div>
              <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Order Number
              </p>
              <p class="font-semibold text-foreground">
                ORD-001
              </p>
            </div>

            <!-- {/* Status */} -->
            <div>
              <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Status
              </p>
              <div class="flex gap-2">
                @for (status of statuses; track $index) {
                  <button matFab extended>
                    {{ status === 'all' ? 'All Orders' : (status | titlecase) }}
                  </button>
                }
              </div>
            </div>

            <!-- {/* Date */} -->
            <div>
              <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Date
              </p>
              <p class="text-foreground">
                <!-- {new Date(selectedOrderData.createdAt).toLocaleDateString()} -->
                2/14/2024
              </p>
            </div>

            <!-- {/* Amount */} -->
            <div>
              <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Total
              </p>
              <p class="font-serif text-2xl font-bold text-primary">
                $1200
              </p>
            </div>

            <!-- {/* Items */} -->
            <div>
              <p class="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                Items
              </p>
              <div class="space-y-2">
                <div key={index} class="text-sm text-muted-foreground">
                  <p>Blush Pink M</p>
                  <p>Qty: 2</p>
                </div>
              </div>
            </div>

            <!-- {/* Action Buttons */} -->
            <div class="pt-4 border-t border-border">
              <button matButton="filled" class="w-full px-4 py-2 mb-2">
                Send Update
              </button>
              <button matButton="outlined" class="w-full px-4 py-2">
                Print Label
              </button>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Orders {
  statuses: string[] = ['all', 'pending', 'confirmed', 'shipped', 'delivered'];
}
