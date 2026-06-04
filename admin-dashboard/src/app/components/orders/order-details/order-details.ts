import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-details',
  imports: [MatIcon, CurrencyPipe],
  template: `
    <div class="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-full sticky top-6">
      @if (order()) {
        <div class="space-y-6">
          <div class="border-b border-gray-100 pb-4">
            <span class="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-1"
              >STATUS</span
            >
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">Order Detail</h2>
              <span
                class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-pink-50 text-pink-700 border border-pink-100"
              >
                #{{ order().id.substring(0, 8) }}
              </span>
            </div>
            <p class="text-3xl font-extrabold text-gray-950 mt-3">
              {{ order().total_amount || order().total | currency }}
            </p>
          </div>

          <div class="space-y-3">
            <span class="text-[10px] font-bold text-gray-400 tracking-wider uppercase block"
              >ITEMS</span
            >
            <div class="divide-y divide-gray-50 max-h-55 overflow-y-auto pr-1">
              @for (item of order().items; track item.id) {
                <div class="flex justify-between items-center py-2.5 text-sm">
                  <div class="space-y-0.5">
                    <p class="font-semibold text-gray-800">{{ item.product_name || 'Producto' }}</p>
                    <p class="text-xs text-gray-400">Cantidad: {{ item.quantity }}</p>
                  </div>
                  <span class="font-bold text-gray-900">{{ item.price | currency }}</span>
                </div>
              }
            </div>
          </div>

          <div class="border-t border-gray-100 pt-5 space-y-3">
            <span class="text-[10px] font-bold text-gray-400 tracking-wider uppercase block"
              >ACTIONS / CHANGE STATUS</span
            >
            <div class="flex flex-wrap gap-2">
              @for (status of availableStatuses; track status) {
                <button
                  mat-stroked-button
                  (click)="statusChanged.emit(status)"
                  [disabled]="order().status?.toLowerCase() === status"
                  [class]="
                    order().status?.toLowerCase() === status.toLowerCase()
                      ? 'bg-pink-600! text-white! font-semibold shadow-sm hover:bg-pink-800!'
                      : 'bg-white! text-gray-600! border border-gray-200'
                  "
                  class="text-xs! rounded-lg! px-3! py-1! capitalize font-medium transition-colors hover:bg-gray-50!"
                >
                  {{ status }}
                </button>
              }
            </div>
          </div>
        </div>
      } @else {
        <div
          class="flex flex-col items-center justify-center text-center py-20 text-gray-400 space-y-3"
        >
          <mat-icon class="text-gray-300 w-12! h-12! text-5xl flex items-center justify-center mb-2"
            >receipt</mat-icon
          >
          <p class="text-sm font-medium">
            Selecciona una orden de la lista para inspeccionar sus detalles y gestionar su estado.
          </p>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class OrderDetails {
  // Recibe la orden seleccionada actualmente
  order = input<any | null>(null);

  // Emite el nuevo estado hacia el padre para actualizar Django
  statusChanged = output<string>();

  availableStatuses = ['pending', 'confirmed', 'shipped', 'delivered'];
}
