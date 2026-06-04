import { Component, inject, input, model, OnInit, output, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/product';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryService } from '../../../services/category-service';
import { Category } from '../../../models/category';
import { MatOption } from "@angular/material/autocomplete";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-form',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatIconModule,
    MatOption,
    MatSelectModule
  ],
  template: `
    <mat-card appearance="outlined" class="p-6 mb-6 animate-fade-in-down">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        {{ productToEdit() ? 'Editar Producto' : 'Nuevo Producto' }}
      </h2>

      <form [formGroup]="productForm" (ngSubmit)="submitForm()" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Nombre</mat-label>
            <input matInput formControlName="name" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Slug</mat-label>
            <input matInput formControlName="slug" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Marca (Brand)</mat-label>
            <input matInput formControlName="brand" />
          </mat-form-field>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Categoría</mat-label>
            <mat-select formControlName="category">
              @for (cat of categories(); track cat.id) {
                <mat-option [value]="cat.id">{{ cat.name }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Precio Base</mat-label>
            <input type="number" matInput formControlName="base_price" prefix="$" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Stock Inicial</mat-label>
            <input type="number" matInput formControlName="stock_quantity" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Límite Stock Bajo</mat-label>
            <input type="number" matInput formControlName="low_stock_threshold" />
          </mat-form-field>
        </div>

        <div class="space-y-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Descripción Corta</mat-label>
            <input matInput formControlName="short_description" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Descripción Completa</mat-label>
            <textarea matInput formControlName="description" rows="4"></textarea>
          </mat-form-field>
        </div>

        <div class="bg-gray-50 p-4 rounded-xl border border-gray-200/60 space-y-4">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-base font-semibold text-gray-800">Variantes del Producto</h3>
              <p class="text-xs text-gray-500">
                Agrega propiedades específicas como Tallas o Colores para este artículo.
              </p>
            </div>
            <button type="button" mat-flat-button color="accent" (click)="addVariant()">
              <mat-icon class="mr-1">add</mat-icon> Añadir Variante
            </button>
          </div>

          <div formArrayName="variants" class="space-y-3">
            @for (variantGroup of variantsFormArray.controls; track $index) {
              <div
                [formGroupName]="$index"
                class="flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm animate-fade-in-down"
              >
                <mat-form-field appearance="outline" class="w-full md:w-1/3 mb-0!">
                  <mat-label>Tipo</mat-label>
                  <input matInput formControlName="variant_type" placeholder="Ej. Talla o Color" />
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full md:w-1/3 mb-0!">
                  <mat-label>Valor</mat-label>
                  <input matInput formControlName="variant_value" placeholder="Ej. M o Negro" />
                </mat-form-field>

                <div class="flex items-center justify-between w-full md:w-auto gap-4 px-2">
                  <mat-slide-toggle formControlName="is_active">Activa</mat-slide-toggle>

                  <button
                    type="button"
                    mat-icon-button
                    color="warn"
                    (click)="removeVariant($index)"
                    class="hover:bg-red-50"
                  >
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
            } @empty {
              <p class="text-sm text-gray-400 italic text-center py-2">
                Este producto no posee variantes (Es un artículo estándar).
              </p>
            }
          </div>
        </div>

        <div
          class="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300"
        >
          <button type="button" mat-stroked-button (click)="fileInput.click()">
            <mat-icon class="mr-1">image</mat-icon> Seleccionar Imagen
          </button>
          <input
            #fileInput
            type="file"
            (change)="onFileSelected($event)"
            accept="image/*"
            class="hidden"
          />

          @if (imagePreview) {
            <div class="w-12 h-12 rounded overflow-hidden border border-gray-200">
              <img [src]="imagePreview" alt="Preview" class="w-full h-full object-cover" />
            </div>
          }
        </div>

        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100"
        >
          <div class="flex gap-6">
            <mat-slide-toggle formControlName="is_active"
              >Producto Visible en Tienda</mat-slide-toggle
            >
            <mat-slide-toggle formControlName="reviews_enabled">Habilitar Reseñas</mat-slide-toggle>
          </div>

          <div class="flex gap-2 justify-end">
            <button type="button" mat-button (click)="cancel()">Cancelar</button>
            <button
              type="submit"
              mat-raised-button
              color="primary"
              [disabled]="productForm.invalid"
            >
              {{ productToEdit() ? 'Actualizar Producto' : 'Guardar Producto' }}
            </button>
          </div>
        </div>
      </form>
    </mat-card>
  `,
  styles: ``,
})
export class ProductForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);

  // Angular 21 Model & Inputs
  isOpen = model<boolean>(false); // Doble vía de comunicación automática
  productToEdit = input<Product | null>(null); // Entrada de datos pura
  formSaved = output<FormData>();

  productForm!: FormGroup;
  categories = signal<Category[]>([]);
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  // Getter de conveniencia para iterar las variantes en el HTML
  get variantsFormArray(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.initForm();

    if (this.productToEdit()) {
      const prod = this.productToEdit()!;

      // Rellenamos campos planos
      this.productForm.patchValue({
        name: prod.name,
        slug: prod.slug,
        brand: prod.brand,
        short_description: prod.short_description,
        description: prod.description,
        base_price: prod.base_price,
        stock_quantity: prod.stock_quantity,
        low_stock_threshold: prod.low_stock_threshold,
        category: prod.category?.id || prod.category, // Depende de cómo venga de Django
        is_active: prod.is_active,
        reviews_enabled: prod.reviews_enabled,
      });

      this.imagePreview = prod.image || null;

      // Si el producto ya tiene variantes en la base de datos, las cargamos al FormArray
      if (prod.variants && prod.variants.length > 0) {
        prod.variants.forEach((v) => this.addVariant(v));
      }
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      slug: ['', [Validators.required, Validators.maxLength(100)]],
      brand: ['', [Validators.required, Validators.maxLength(100)]],
      short_description: ['', [Validators.maxLength(255)]],
      description: ['', [Validators.required]],
      base_price: [0, [Validators.required, Validators.min(0)]],
      stock_quantity: [0, [Validators.required, Validators.min(0)]],
      low_stock_threshold: [5, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]], // Llave foránea UUID
      is_active: [true],
      reviews_enabled: [true],
      variants: this.fb.array([]), // Array dinámico vacío al inicio
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((data) => this.categories.set(data));
  }

  // Métodos para el FormArray de Variantes
  addVariant(variantData?: any): void {
    const variantGroup = this.fb.group({
      // variant_type: [variantData?.variant_type || '', [Validators.required]], // Ej: 'Talla' o 'Color'
      // variant_value: [variantData?.variant_value || '', [Validators.required]], // Ej: 'M' o 'Negro'
      variant_type: [variantData?.variant_type || '' ], // Ej: 'Talla' o 'Color'
      variant_value: [variantData?.variant_value || ''], // Ej: 'M' o 'Negro'
      is_active: [variantData?.is_active ?? true],
    });
    this.variantsFormArray.push(variantGroup);
  }

  removeVariant(index: number): void {
    this.variantsFormArray.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  cancel(): void {
    this.isOpen.set(false); // Cierra el formulario inline y avisa al padre
  }

  submitForm(): void {
    if (this.productForm.invalid) return;

    const formData = new FormData();

    // Adjuntamos todos los campos del formulario al FormData
    Object.keys(this.productForm.controls).forEach((key) => {
      if (key !== 'variants') {
        formData.append(key, this.productForm.get(key)?.value);
      }
    });

    // Adjuntamos el archivo binario de la imagen real (si el usuario la seleccionó)
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    // Convertimos el array de variantes a un String JSON para que Django lo reciba de un solo golpe
    const variantsValue = this.variantsFormArray.value;
    formData.append('variants', JSON.stringify(variantsValue));

    this.formSaved.emit(formData); // Despachamos al componente padre
  }
}
