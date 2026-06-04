import { Component, computed, Input, signal } from '@angular/core';
import { MenuItem } from '../../models/MenuItem';
import { MatNavList } from '@angular/material/list';
import { CdkMenu } from '@angular/cdk/menu';
import { ItemMenu } from "../item-menu/item-menu";

@Component({
  selector: 'app-custom-sidenav',
  imports: [MatNavList, ItemMenu, CdkMenu],
  template: `
    <div class="h-full pt-4 flex flex-col gap-4" cdkMenu>
      <div class="flex flex-col items-center">
        <img
          class="rounded-full"
          [style.width.px]="profilePicSize()"
          [style.height.px]="profilePicSize()"
          src="https://picsum.photos/200/300"
          alt=""
        />
        <div class="h-12 pt-6 items-center">
          @if (sideNavCollapsed()) {
            <h2>Bienvenida</h2>
          }
        </div>
      </div>
      <mat-nav-list>
        @for (item of menuItem(); track item.label) {
          <app-item-menu [item]="item" [collapsed]="sideNavCollapsed()" />
        }
      </mat-nav-list>
    </div>
  `,
  styles: ``,
})
export class CustomSidenav {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItem = signal<MenuItem[]>([
    {
      icon: 'pie_chart',
      label: 'Home',
      route: 'dashboard',
    },
    {
      icon: 'category',
      label: 'Categories',
      route: 'categories',
    },
    {
      icon: 'shopping_cart',
      label: 'Products',
      route: 'products',
    },
    {
      icon: 'delivery_dining',
      label: 'Orders',
      route: 'orders',
    },
    {
      icon: 'analytics',
      label: 'Reports',
      route: 'reports',
    },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? 100 : 32));
}
