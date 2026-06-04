import { Component, computed, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchBar } from "../../components/search-bar/search-bar";
import { ProductsTable } from "../../components/products/products-table/products-table";
import { ProductsService } from '../../services/products-service';
import { Toaster } from '../../services/toaster';
import { Product } from '../../models/product';
import { ProductForm } from "../../components/products/product-form/product-form";

@Component({
  selector: 'app-products',
  imports: [MatButtonModule, MatIcon, SearchBar, ProductsTable, ProductForm],
  template: `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground mb-2">Products</h1>
        <p class="text-muted-foreground">
          Manage your store's products. Add new products, edit existing ones, and keep your
          inventory up to date.
        </p>
      </div>
      @if (!isFormOpen()) {
        <button matFab extended (click)="triggerCreate()">
          <mat-icon>add</mat-icon>
          Add Product
        </button>
      }
    </div>
    <!-- Search Bar -->
    <app-search-bar />

    <!-- Formulario para agregar productos -->
    @if (isFormOpen()) {
      <app-product-form
        [(isOpen)]="isFormOpen"
        [productToEdit]="selectedProduct()"
        (formSaved)="onSaveProduct($event)"
      />
    }

    <!-- Products Table -->
    <app-products-table
      [dataSource]="products()"
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
export default class Products {
  private readonly productService = inject(ProductsService);
  private readonly toast = inject(Toaster);

  products = signal<Product[]>([]);

  // Control de estados del Formulario Inline
  isFormOpen = signal<boolean>(false);
  selectedProduct = signal<Product | null>(null);
  @ViewChild('deleteConfirmTemplate') deleteTemplate!: TemplateRef<any>;
  private currentDeleteId: string | null = null;
  private currentToastRef: any = null;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: () => this.toast.error('Error al cargar los productos desde el servidor'),
    });
  }

  triggerCreate(): void {
    this.selectedProduct.set(null); // Reseteamos edición
    this.isFormOpen.set(true); // Despliega el formulario hijo
  }

  triggerEdit(product: Product): void {
    this.selectedProduct.set(product); // Cargamos la categoría seleccionada
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

    this.productService.delete(id).subscribe({
      next: () => {
        this.toast.success('Categoría eliminada correctamente 🗑️');
        this.loadProducts(); // Refresca la tabla
        this.closeConfirmToast();

        if (this.selectedProduct()?.id === id) {
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

  onSaveProduct(formData: FormData): void {
    const activeProduct = this.selectedProduct();

    if (activeProduct) {
      // Flujo de Actualización
      this.productService.update(activeProduct.id, formData).subscribe({
        next: () => {
          this.toast.success('Producto actualizado con éxito 🎉');
          this.loadProducts();
          this.isFormOpen.set(false);
        },
        error: () => this.toast.error('Error al intentar actualizar el producto'),
      });
    } else {
      // Flujo de Creación
      this.productService.create(formData).subscribe({
        next: () => {
          this.toast.success('Producto creado con éxito 🚀');
          this.loadProducts();
          this.isFormOpen.set(false);
        },
        error: () => this.toast.error('Error al intentar guardar el producto'),
      });
    }
  }

  // 1. Agrega una signal para el término de búsqueda actual
  searchTerm = signal<string>('');

  // 2. Creamos una Computed Signal para filtrar en tiempo real de forma ultra reactiva
  filteredProducts = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    const allProducts = this.products(); // Tu signal que ya trae los datos del servicio

    if (!query) {
      return allProducts;
    }

    return allProducts.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        (cat.description && cat.description.toLowerCase().includes(query)),
    );
  });

  // 3. Métodos que responden a los outputs del buscador:
  onSearchQueryChange(query: string): void {
    this.searchTerm.set(query);
  }

  onProductSelect(product: any): void {
    // Acción cuando el usuario selecciona una opción del autocompletado
    console.log('Categoría seleccionada en el buscador:', product);

    // Opcional: Si quieres que al dar click la tabla se reduzca solo a ese elemento:
    this.searchTerm.set(product.name);

    // O puedes abrir directamente el formulario de edición si lo deseas:
    // this.triggerEdit(category);
  }

  resetSearch(): void {
    this.searchTerm.set('');
  }
}
