import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  imports: [
    MatIcon,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  template: `
    <div class="mb-6 relative">
      <form>
        <mat-form-field class="w-full">
          <mat-icon matPrefix>search</mat-icon>
          <mat-label>Search Products</mat-label>
          <input
            type="text"
            matInput
            placeholder="Search by name, category, or SKU"
            aria-label="Search Products"
            [formControl]="searchProduct"
            [matAutocomplete]="auto"
          />
          <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
            @for (option of filteredOptions | async; track option) {
              <mat-option [value]="option">{{ option }}</mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class SearchBar {
  searchProduct = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor() {
    this.filteredOptions = this.searchProduct.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
