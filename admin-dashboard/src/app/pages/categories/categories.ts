import { Component, inject, signal, ViewChild, TemplateRef } from '@angular/core';
import { CategoriesTable } from '../../components/categories/categories-table/categories-table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category-service';
import { CategoryForm } from '../../components/categories/category-form/category-form';
import { Toaster } from '../../services/toaster';


@Component({
  selector: 'app-categories',
  imports: [MatButtonModule, MatIcon, CategoriesTable, CategoryForm],
  template: `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground mb-2">Categories</h1>
        <p class="text-muted-foreground">
          Manage your store's categories. Add new category, edit existing ones, and keep your
          inventory up to date.
        </p>
      </div>

      @if (!isFormOpen()) {
        <button matFab extended (click)="triggerCreate()">
          <mat-icon>add</mat-icon>
          Add Categorie
        </button>
      }
    </div>

    <!-- Formulario para agregar productos -->
    @if (isFormOpen()) {
      <app-category-form
        [(isOpen)]="isFormOpen"
        [categoryToEdit]="selectedCategory()"
        (formSaved)="onSaveCategory($event)"
      />
    }
    <!-- Products Table -->
    <app-categories-table
      [dataSource]="categories()"
      (editAction)="triggerEdit($event)"
      (deleteAction)="triggerDelete($event)"
    />

    <ng-template #deleteConfirmTemplate>
      <div class="flex flex-col gap-3">
        <p class="text-sm font-medium text-gray-900">
          ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.
        </p>
        <div class="flex justify-end gap-2">
          <button
            (click)="closeConfirmToast()"
            class="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            (click)="confirmDelete()"
            class="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
})
export default class Categories {
  private readonly categoryService = inject(CategoryService);
  private readonly toast = inject(Toaster);

  categories = signal<Category[]>([]);

  // Control de estados del Formulario Inline
  isFormOpen = signal<boolean>(false);
  selectedCategory = signal<Category | null>(null);
  @ViewChild('deleteConfirmTemplate') deleteTemplate!: TemplateRef<any>;
  private currentDeleteId: string | null = null;
  private currentToastRef: any = null;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories.set(data),
      error: () => this.toast.error('Error al cargar las categorías desde el servidor'),
    });
  }

  triggerCreate(): void {
    this.selectedCategory.set(null); // Reseteamos edición
    this.isFormOpen.set(true); // Despliega el formulario hijo
  }

  triggerEdit(category: Category): void {
    this.selectedCategory.set(category); // Cargamos la categoría seleccionada
    this.isFormOpen.set(true); // Despliega el formulario hijo
    // Auto-scroll suave hacia el formulario para mejorar el UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  triggerDelete(id: string): void {
    if (!id) {
      this.toast.error('No se pudo identificar la categoría a eliminar');
      return;
    }

    this.currentDeleteId = id; // Guardamos el ID temporalmente
    this.currentToastRef = this.toast.showConfirm(this.deleteTemplate); // Desplegamos el toast con el template
  }

  confirmDelete(): void {
    const id = this.currentDeleteId;
    if (!id) return;

    this.categoryService.delete(id).subscribe({
      next: () => {
        this.toast.success('Categoría eliminada correctamente 🗑️');
        this.loadCategories(); // Refresca la tabla
        this.closeConfirmToast();

        if (this.selectedCategory()?.id === id) {
          this.isFormOpen.set(false);
        }
      },
      error: (err) => {
        console.error(err);
        this.toast.error('No se pudo eliminar la categoría del servidor');
        this.closeConfirmToast();
      },
    });
  }

  closeConfirmToast(): void {
    if (this.currentToastRef) {
      this.currentToastRef.close(); // Cierra el toast de confirmación de forma segura
    }
    this.currentDeleteId = null;
  }

  onSaveCategory(formData: FormData): void {
    const activeCategory = this.selectedCategory();

    if (activeCategory) {
      // Flujo de Actualización
      this.categoryService.update(activeCategory.id, formData).subscribe({
        next: () => {
          this.toast.success('Categoría actualizada con éxito 🎉');
          this.loadCategories();
          this.isFormOpen.set(false);
        },
        error: () => this.toast.error('Error al intentar actualizar la categoría'),
      });
    } else {
      // Flujo de Creación
      this.categoryService.create(formData).subscribe({
        next: () => {
          this.toast.success('Categoría creada con éxito 🚀');
          this.loadCategories();
          this.isFormOpen.set(false);
        },
        error: () => this.toast.error('Error al intentar guardar la categoría'),
      });
    }
  }
}
