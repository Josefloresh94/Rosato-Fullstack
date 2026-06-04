import { Component, inject, input, model, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../models/category';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-form',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6 animate-fade-in-down">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        {{ categoryToEdit() ? 'Editar Categoría' : 'Nueva Categoría' }}
      </h2>

      <form [formGroup]="categoryForm" (ngSubmit)="submitForm()" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Nombre</mat-label>
            <input matInput formControlName="name" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Slug</mat-label>
            <input matInput formControlName="slug" />
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Descripción</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

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

        <div class="flex items-center justify-between pt-2">
          <mat-slide-toggle formControlName="is_active">Categoría Activa</mat-slide-toggle>

          <div class="flex gap-2">
            <button type="button" mat-button (click)="cancel()">Cancelar</button>
            <button
              type="submit"
              mat-raised-button
              color="primary"
              [disabled]="categoryForm.invalid"
            >
              {{ categoryToEdit() ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class CategoryForm implements OnInit {
  private readonly fb = inject(FormBuilder);

  // Angular 21 Model & Inputs
  isOpen = model<boolean>(false); // Doble vía de comunicación automática
  categoryToEdit = input<Category | null>(null); // Entrada de datos pura

  // Angular 21 Outputs eficientes
  formSaved = output<FormData>();

  categoryForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  ngOnInit(): void {
    this.initForm();
    // Si nos pasan una categoría para editar, rellenamos el formulario
    if (this.categoryToEdit()) {
      const cat = this.categoryToEdit()!;
      this.categoryForm.patchValue(cat);
      this.imagePreview = cat.image || null;
    }
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      slug: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      is_active: [true],
    });
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
    if (this.categoryForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.categoryForm.get('name')?.value);
    formData.append('slug', this.categoryForm.get('slug')?.value);
    formData.append('description', this.categoryForm.get('description')?.value || '');
    formData.append('is_active', String(this.categoryForm.get('is_active')?.value));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.formSaved.emit(formData); // Despachamos el FormData listo para Django
  }
}
