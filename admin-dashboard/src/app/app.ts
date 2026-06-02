import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenav } from './components/custom-sidenav/custom-sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIcon, MatSidenavModule, CustomSidenav],
  template: `
    <mat-toolbar class="relative z-5 shadow-md">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon class="mat-18">menu</mat-icon>
      </button>
    </mat-toolbar>
    <mat-sidenav-container class="h-screen">
      <mat-sidenav mode="side" [style.width]="sidenavWidth()" opened>
        <app-custom-sidenav [collapsed]="collapsed()" />
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [],
})
export class App {
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '250px' : '64px'));
}
