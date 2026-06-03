import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchBar } from "../../components/products/search-bar/search-bar";
import { ProductsTable } from "../../components/products/products-table/products-table";

@Component({
  selector: 'app-products',
  imports: [
    MatButtonModule,
    MatIcon,
    SearchBar,
    ProductsTable
],
  template: `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground mb-2">Products</h1>
        <p class="text-muted-foreground">
          Manage your store's products. Add new products, edit existing ones, and keep your
          inventory up to date.
        </p>
      </div>
      <button matFab extended>
        <mat-icon>add</mat-icon>
        Add Product
      </button>
    </div>
    <!-- Acá ira el formulario para agregar productos -->
    <!-- Search Bar -->
    <app-search-bar />

    <!-- Products Table -->
    <app-products-table />
  `,
  styles: ``,
})
export default class Products {

}
