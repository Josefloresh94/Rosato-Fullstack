import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input, model, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-orders-table',
  imports: [MatButtonModule, DatePipe, TitleCasePipe],
  template: `
    <div class="flex flex-col h-full">
      <div class="flex flex-wrap gap-2 mb-6 bg-gray-50 p-2 rounded-xl border border-gray-100">
        @for (status of statuses; track status) {
          <button
            mat-button
            (click)="currentStatus.set(status)"
            [class]="
              currentStatus() === status
                ? 'bg-pink-50! text-pink-700! font-semibold shadow-sm'
                : 'text-gray-600'
            "
            class="rounded-lg! text-xs md:text-sm capitalize px-4 py-1.5 transition-all"
          >
            {{ status === 'all' ? 'All Orders' : status | titlecase}}
          </button>
        }
      </div>

      <div class="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[calc(100vh-220px)]">
        @for (order of orders(); track order.id) {
          <div
            (click)="orderSelected.emit(order)"
            [class]="
              selectedOrderId() === order.id
                ? 'border-pink-300 bg-pink-50/20 shadow-md'
                : 'border-gray-100 hover:bg-gray-50/80 bg-white shadow-sm'
            "
            class="border p-4 rounded-xl cursor-pointer transition-all flex justify-between items-center group"
          >
            <div class="space-y-1">
              <h3 class="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                #{{ order.id.substring(0, 8) }}...
              </h3>
              <p class="text-xs text-gray-500 font-medium">
                {{ order.created_at | date: 'short' }} • {{ order.items?.length || 0 }} item(s)
              </p>
            </div>

            <div class="text-right space-y-2">
              <p class="font-bold text-gray-950 text-base">
                \${{ order.total_amount || order.total }}
              </p>
              <span
                [class]="getStatusClass(order.status)"
                class="inline-block px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-full tracking-wider border"
              >
                {{ order.status }}
              </span>
            </div>
          </div>
        } @empty {
          <div
            class="p-8 text-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-200"
          >
            No se encontraron órdenes en este estado.
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class OrdersTable {
  // Recibe las órdenes filtradas del padre
  orders = input<any[]>([]);
  selectedOrderId = input<string | undefined>('');

  // Sincroniza el estado del filtro con el padre mediante un modelo bidireccional
  currentStatus = model<string>('all');

  // Avisa al padre cuando el usuario selecciona una orden
  orderSelected = output<any>();

  statuses = ['all', 'pending', 'confirmed', 'shipped', 'delivered'];

  getStatusClass(status: string): string {
    const s = status?.toLowerCase();
    if (s === 'pending') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (s === 'confirmed') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (s === 'shipped') return 'bg-purple-50 text-purple-700 border-purple-200';
    if (s === 'delivered') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}
