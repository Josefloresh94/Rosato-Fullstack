import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-bar',
  imports: [
    MatIcon,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="mb-6 relative">
      <form>
        <mat-form-field
          class="w-full"
          appearance="outline"
        >
          <mat-label>{{ label() }}</mat-label>
          <input
            type="text"
            matInput
            [formControl]="searchControl"
            [matAutocomplete]="auto"
            [placeholder]="placeholder()"
          />
          <mat-icon matPrefix>search</mat-icon>
          @if (searchControl.value) {
            <button
              mat-icon-button
              matSuffix
              (click)="clearSearch()"
            >
              <mat-icon matSuffix class="mr-5">close</mat-icon>
            </button>
          }

          <mat-autocomplete
            #auto="matAutocomplete"
            [displayWith]="displayFn"
            (optionSelected)="onOptionSelected($event)"
          >
            @for (option of filteredOptions(); track option.id) {
              <mat-option [value]="option" class="hover:bg-gray-50 text-gray-900 font-medium">
                {{ option.name }}
              </mat-option>
            } @empty {
              <mat-option disabled class="text-gray-400 text-sm italic">
                No se encontraron resultados
              </mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class SearchBar implements OnInit {
  private destroyRef = inject(DestroyRef);

  // Inputs configurables desde el padre
  label = input<string>('Buscar');
  placeholder = input<string>('Escribe para buscar...');
  filteredOptions = input<any[]>([]); // Lista de opciones filtradas que le pasa el padre

  // Outputs para notificar eventos al padre
  queryChanged = output<string>(); // Emite el texto plano cuando el usuario escribe
  optionSelected = output<any>(); // Emite el objeto completo seleccionado (id, name, etc.)
  cleared = output<void>(); // Emite cuando el usuario limpia el buscador

  searchControl = new FormControl('');

  ngOnInit(): void {
    // Escuchamos los cambios del input con operadores de optimización de rendimiento
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Espera 300ms después de que el usuario deja de escribir
        distinctUntilChanged(), // Solo emite si el texto realmente cambió
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        const query = typeof value === 'string' ? value : '';
        this.queryChanged.emit(query);
      });
  }

  // Define qué texto mostrar en el input cuando se selecciona una opción de la lista
  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.optionSelected.emit(event.option.value);
  }

  clearSearch(): void {
    this.searchControl.reset('');
    this.cleared.emit();
  }
}
