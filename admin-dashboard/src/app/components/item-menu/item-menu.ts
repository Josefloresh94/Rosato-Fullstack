import { Component, computed, input, signal } from '@angular/core';
import { MenuItem } from '../../models/MenuItem';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatListItem } from '@angular/material/list';
import { CdkMenuItem } from '@angular/cdk/menu';

@Component({
  selector: 'app-item-menu',
  imports: [RouterLink, RouterLinkActive, MatIcon, MatListItem, CdkMenuItem],
  template: `
    <button
      cdkMenuItem
      class="menu-item flex items-center px-4 py-2 text-sm group-hover:bg-gray-200"
      mat-list-item
      [routerLink]="routeHistory() + '/' + item().route"
      (click)="nestedItemOpen.set(!nestedItemOpen())"
      routerLinkActive="selected-menu-item"
      #rla="routerLinkActive"
      [style.--mat-list-list-item-leading-icon-start-space]="indentation()"
      [activated]="rla.isActive"
    >
      <mat-icon
        class="self-center"
        [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
        matListItemIcon
        >{{ item().icon }}</mat-icon
      >
      @if (collapsed()) {
        <span matListItemTitle class="px-4">{{ item().label }}</span>
      }

      @if (item().subItems) {
        <span matListItemMeta>
          @if (nestedItemOpen()) {
            <mat-icon>expand_less</mat-icon>
          } @else {
            <mat-icon>expand_more</mat-icon>
          }
        </span>
      }
    </button>

    @if (nestedItemOpen()) {
      <div @expandContractMenu>
        @for (subItem of item().subItems; track subItem.label) {
          <app-item-menu
            [item]="subItem"
            [collapsed]="collapsed()"
            [routeHistory]="routeHistory() + '/' + item().route"
          />
        }
      </div>
    }
  `,
  styles: `
    :host ::ng-deep .menu-item {
      border-radius: 0 !important;
      border-left: 5px solid transparent;
    }

    :host ::ng-deep .menu-item.selected-menu-item {
      border-left-color: var(--mat-sys-primary) !important;
    }

    :host ::ng-deep .menu-item.selected-menu-item mat-icon,
    :host ::ng-deep .menu-item.selected-menu-item span {
      color: var(--mat-sys-primary) !important;
    }
  `,
})
export class ItemMenu {
  item = input.required<MenuItem>();
  collapsed = input(true);
  routeHistory = input('');
  nestedItemOpen = signal(false);
  level = computed(() => this.routeHistory().split('/').length - 1);
  indentation = computed(() => (this.collapsed() ? `${16 + this.level() * 16}px` : '16px'));
}
