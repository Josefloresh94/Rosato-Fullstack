import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OrdersTable } from "../../components/orders/orders-table/orders-table";
import { OrderDetails } from "../../components/orders/order-details/order-details";
import { Toaster } from '../../services/toaster';
import { OrdersService } from '../../services/orders-service';
import { OrderStatus } from '../../models/order';
@Component({
  selector: 'app-orders',
  imports: [MatButtonModule, OrdersTable, OrderDetails],
  template: `
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-foreground mb-2">Órdenes</h1>
      <p class="text-sm text-gray-500">
        Monitorea y actualiza los despachos de la tienda en tiempo real.
      </p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div class="lg:col-span-2">
        <app-orders-table
          [orders]="filteredOrders()"
          [selectedOrderId]="selectedOrder()?.id"
          [(currentStatus)]="activeFilter"
          (orderSelected)="onOrderSelect($event)"
        >
        </app-orders-table>
      </div>

      <div class="lg:col-span-1">
        <app-order-details [order]="selectedOrder()" (statusChanged)="onStatusUpdate($event)">
        </app-order-details>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Orders implements OnInit {
  private readonly orderService = inject(OrdersService);
  private readonly toaster = inject(Toaster);

  // Almacén de las órdenes puras del Backend
  orders = signal<any[]>([]);

  // Filtro seleccionado activamente (Enlazado bidireccionalmente al hijo)
  activeFilter = signal<string>('all');

  // Orden en foco para visualización de detalles
  selectedOrder = signal<any | null>(null);

  // Computed Signal: Filtra las órdenes automáticamente en memoria de forma instantánea
  filteredOrders = computed(() => {
    const filter = this.activeFilter().toLowerCase();
    const allOrders = this.orders();

    if (filter === 'all') return allOrders;
    return allOrders.filter((o) => o.status?.toLowerCase() === filter);
  });

  ngOnInit(): void {
    // Comentamos temporalmente la llamada al servicio real:
    // this.loadOrders();

    // Inyectamos datos de prueba directamente para ver el diseño interactivo:
    const mockOrders = [
      {
        id: 'd3b07384-order-1',
        total_amount: 154.5,
        status: 'pending',
        created_at: new Date(),
        items: [
          { id: 'item-1', product_name: 'Vestido Rosato Premium', quantity: 2, price: 50.0 },
          { id: 'item-2', product_name: 'Top Casual Silk', quantity: 1, price: 54.5 },
        ],
      },
      {
        id: 'a1c29475-order-2',
        total_amount: 45.0,
        status: 'shipped',
        created_at: new Date(Date.now() - 86400000), // Ayer
        items: [{ id: 'item-3', product_name: 'Falda Midi Plisada', quantity: 1, price: 45.0 }],
      },
      {
        id: 'f9e8d7c6-order-3',
        total_amount: 210.0,
        status: 'delivered',
        created_at: new Date(Date.now() - 172800000), // Hace 2 días
        items: [{ id: 'item-4', product_name: 'Blusa Satín Elegante', quantity: 3, price: 70.0 }],
      },
    ];

    this.orders.set(mockOrders);
    this.selectedOrder.set(mockOrders[0]); // Selecciona la primera automáticamente
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders.set(data);
        // Selección automática del primer elemento para mantener la estética Premium de Rosato
        if (data.length > 0 && !this.selectedOrder()) {
          this.selectedOrder.set(data[0]);
        }
      },
      error: () => this.toaster.error('No se pudieron recuperar las órdenes del servidor'),
    });
  }

  onOrderSelect(order: any): void {
    this.selectedOrder.set(order);
  }

  onStatusUpdate(newStatus: string): void {
    const current = this.selectedOrder();
    if (!current) return;

    // Creamos el objeto de la orden modificada con el nuevo estado
    const updatedOrder = { ...current, status: newStatus.toLowerCase() };

    // 1. Actualizamos la lista completa de órdenes en memoria
    this.orders.update((prev) => prev.map((o) => (o.id === current.id ? updatedOrder : o)));

    // 2. Actualizamos la orden que se está viendo a la derecha
    this.selectedOrder.set(updatedOrder);

    this.toaster.success(`Estado simulado cambiado a: ${newStatus} 🎉`);
  }

  // onStatusUpdate(newStatus: string): void {
  //   const current = this.selectedOrder();
  //   if (!current) return;

  //   // 1. Casteamos el string genérico al tipo estricto que acepta tu servicio
  //   const statusPayload = newStatus.toLowerCase() as OrderStatus;

  //   // 2. Le pasamos el estado directamente (o como lo requiera tu servicio)
  //   // Si tu servicio recibe el string directo: updateStatus(id, statusPayload)
  //   // Si recibe un objeto con ese tipo: updateStatus(id, { status: statusPayload })
  //   this.orderService.updateStatus(current.id, statusPayload).subscribe({
  //     next: (updatedOrder) => {
  //       this.toaster.success(`Orden #${current.id.substring(0, 8)} actualizada a ${newStatus} 🎉`);

  //       // Sincronización reactiva instantánea
  //       this.orders.update((prev) => prev.map((o) => (o.id === current.id ? updatedOrder : o)));
  //       this.selectedOrder.set(updatedOrder);
  //     },
  //     error: () => this.toaster.error('Error al intentar cambiar el estado en el servidor'),
  //   });
  // }
}
