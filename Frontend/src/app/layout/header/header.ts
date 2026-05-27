import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from "../header-actions/header-actions";
import { Sidenav } from '../../services/sidenav';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, HeaderActions],
  template: `
    <mat-toolbar class="w-full elevated py-2">
      <div class="max-w-300 mx-auto w-full flex items-center justify-between">
        <button
          matIconButton
          class="example-icon"
          aria-label="Toggle menu"
          (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Rosato</span>
        <span class="example-spacer"></span>
        <app-header-actions />
      </div>
      <div></div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {
  sidenav = inject(Sidenav)
}
