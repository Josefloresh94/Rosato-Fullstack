import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../ecommerce-store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel, CurrencyPipe],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">Order Summary</h2>

      <div class="space-y-2 pb-4">
        <ng-content select="[checkoutItems]" />
      </div>

      <div class="space-y-3 text-lg pt-4 border-t">
        <div class="flex justify-between">
          <span>Subtotal:</span>
          <span>{{ subtotal() | currency }}</span>
        </div>
        <div class="flex justify-between">
          <span>Tax:</span>
          <span>{{ tax() | currency }}</span>
        </div>
        <div class="flex justify-between border-t pt-3 font-bold text-lg">
          <span>Total:</span>
          <span>{{ total() | currency }}</span>
        </div>
      </div>
      <ng-content select="[actionButtons]" />
    </div>
  `,
  styles: ``,
})
export class SummarizeOrder {
  store = inject(EcommerceStore);

  subtotal = computed(() =>
    Math.round(
      this.store.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0),
    ),
  );

  tax = computed(() => Math.round(0.05 * this.subtotal()));

  total = computed(() => this.subtotal() + this.tax());
}
