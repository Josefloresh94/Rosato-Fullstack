import { Component, input, output } from '@angular/core';
import { Category } from '../../../models/category';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-categories-table',
  imports: [MatCard, MatTableModule, MatButtonModule, MatIcon],
  template: `
    <mat-card class="p-6 w-full" appearance="outlined">
      <div class="w-full overflow-x-auto">
        <table mat-table [dataSource]="dataSource()" class="w-full min-w-150">
          <ng-container matColumnDef="name">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="text-gray-400 font-semibold text-xs uppercase tracking-wider"
            >
              <div class="flex justify-center w-full">Name</div>
            </th>
            <td mat-cell *matCellDef="let element" class="text-sm font-medium text-gray-900 py-4">
              <div class="flex justify-center w-full">
                {{ element.name }}
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="slug">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="text-xs text-gray-400 font-semibold uppercase tracking-wider"
            >
              <div class="flex justify-center w-full">Slug</div>
            </th>
            <td
              mat-cell
              *matCellDef="let element"
              class="text-sm text-gray-500 max-w-xs truncate py-4"
            >
              <div class="flex justify-center w-full">
                {{ element.slug }}
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="text-xs font-semibold text-gray-400 uppercase tracking-wider"
            >
              <div class="flex justify-center w-full">Descripcíon</div>
            </th>
            <td mat-cell *matCellDef="let element" class="max-w-60 mx-auto truncate">
              {{ element.description || 'Sin descripción' }}
            </td>
          </ng-container>

          <ng-container matColumnDef="is_active">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="text-xs font-semibold text-gray-400 uppercase tracking-wider py-4"
            >
              <div class="flex justify-center w-full">Estado</div>
            </th>
            <td mat-cell *matCellDef="let element" class="py-4">
              <div class="flex justify-center w-full">
                @if (element.is_active) {
                  <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Activo
                  </span>
                } @else {
                  <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span> Inactivo
                  </span>
                }
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="text-xs font-semibold text-gray-400 uppercase tracking-wider py-4 text-center"
            >
              <div class="flex justify-center w-full">Acciones</div>
            </th>
            <td mat-cell *matCellDef="let element" class="py-4 text-center">
              <div class="flex items-center justify-center gap-3">
                <button mat-raised-button class="w-8" (click)="editAction.emit(element)">
                  <div class="flex items-center justify-center gap-1">
                    <mat-icon>edit</mat-icon>
                  </div>
                </button>
                <button matMiniFab (click)="deleteAction.emit(element.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedColumns"
            class="bg-gray-50/70 border-b border-gray-100"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedColumns"
            class="hover:bg-gray-50/50 transition-colors border-b border-gray-100/80"
          ></tr>
        </table>
      </div>
    </mat-card>
  `,
  styles: ``,
})
export class CategoriesTable {
  dataSource = input<Category[]>([]);

  editAction = output<Category>();
  deleteAction = output<string>();
  displayedColumns: string[] = ['name', 'slug', 'description', 'is_active', 'actions'];
}
