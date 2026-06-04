import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { MatCard } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-products-table',
  imports: [MatCard, CurrencyPipe, MatTableModule, MatButtonModule, MatIcon],
  template: `
    <mat-card class="p-6" appearance="outlined">
      <table mat-table [dataSource]="dataSource" class="w-full">
        <!-- Position Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Category</th>
          <td mat-cell *matCellDef="let element">{{ element.category }}</td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Price</th>
          <td mat-cell *matCellDef="let element">{{ element.price | currency }}</td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="stock">
          <th mat-header-cell *matHeaderCellDef>Symbol</th>
          <td mat-cell *matCellDef="let element">{{ element.stock }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let element">
            <button matMiniFab><mat-icon>edit</mat-icon></button>
            <button matMiniFab class="ml-4"><mat-icon>delete</mat-icon></button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </mat-card>
  `,
  styles: ``,
})
export class ProductsTable {
  displayedColumns: string[] = ['name', 'category', 'price', 'stock', 'actions'];
  dataSource = ELEMENT_DATA;
}
