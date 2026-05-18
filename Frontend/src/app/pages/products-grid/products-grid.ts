import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe
  ],
  template: `
    <mat-sidenav-container class="h-full">
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>
          <mat-nav-list>
            @for (cat of categories(); track cat) {
              <mat-list-item [activated]="cat === category()" class="my-2" [routerLink]="['/products', cat]">
                <span matListItemTitle class="font-medium" [class]="cat === category() ? 'text-white!' : null">
                  {{ cat | titlecase}}
                </span>
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ category() | titlecase}}</h1>
        <p class="text-base text-gray-600 mb-6">{{filteredProducts().length}} products found</p>
        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id) {
            <app-product-card [product]="product" (addToCartClicked)="addToCart($event)" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');
  products = signal<Product[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      description:
        'Latest generation smartphone with A17 Pro chip, 48MP camera and 6.7-inch Super Retina XDR display',
      price: 1199.99,
      imageUrl: 'https://images.unsplash.com/photo-1696446702061-cbd2f6b4d6c9?w=500',
      rating: 4.8,
      reviewCount: 1247,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '2',
      name: 'MacBook Air M3',
      description:
        'Ultra-thin laptop with M3 chip, 13.6" Liquid Retina display, 8GB RAM and 256GB SSD',
      price: 1099.0,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      rating: 4.9,
      reviewCount: 892,
      inStock: true,
      category: 'computers',
    },
    {
      id: '3',
      name: 'Sony WH-1000XM5',
      description:
        'Wireless headphones with industry-leading noise cancellation and up to 30 hours of battery life',
      price: 399.99,
      imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
      rating: 4.7,
      reviewCount: 2156,
      inStock: true,
      category: 'audio',
    },
    {
      id: '4',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium smartphone with integrated S Pen, 200MP camera and 6.8" AMOLED display',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
      rating: 4.6,
      reviewCount: 1089,
      inStock: false,
      category: 'electronics',
    },
    {
      id: '5',
      name: 'iPad Pro 12.9"',
      description:
        'Professional tablet with M2 chip, Liquid Retina XDR display and Apple Pencil compatibility',
      price: 1099.0,
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      rating: 4.8,
      reviewCount: 734,
      inStock: true,
      category: 'tablets',
    },
    {
      id: '6',
      name: 'Canon EOS R6 Mark II',
      description: 'Full-frame mirrorless camera with 24.2MP, 4K 60fps video recording',
      price: 2499.0,
      imageUrl: 'https://images.unsplash.com/photo-1606980227002-e28c18b8c48e?w=500',
      rating: 4.9,
      reviewCount: 456,
      inStock: true,
      category: 'cameras',
    },
    {
      id: '7',
      name: 'Apple Watch Series 9',
      description: 'Smartwatch with Always-On display, advanced health sensors and built-in GPS',
      price: 399.0,
      imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
      rating: 4.7,
      reviewCount: 1823,
      inStock: true,
      category: 'wearables',
    },
    {
      id: '8',
      name: 'Nintendo Switch OLED',
      description: 'Hybrid gaming console with 7" OLED screen, 64GB of storage',
      price: 349.99,
      imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
      rating: 4.8,
      reviewCount: 2987,
      inStock: true,
      category: 'gaming',
    },
    {
      id: '9',
      name: 'Dyson V15 Detect',
      description: 'Cordless vacuum cleaner with laser technology to detect microscopic dust',
      price: 649.99,
      imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
      rating: 4.6,
      reviewCount: 678,
      inStock: true,
      category: 'home',
    },
    {
      id: '10',
      name: 'Kindle Paperwhite',
      description: 'E-reader with 6.8" display, adjustable lighting and IPX8 water resistance',
      price: 139.99,
      imageUrl: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=500',
      rating: 4.7,
      reviewCount: 4521,
      inStock: true,
      category: 'e-readers',
    },
    {
      id: '11',
      name: 'LG OLED C3 55"',
      description: '4K OLED Smart TV with α9 Gen6 processor, HDMI 2.1 and Dolby Vision support',
      price: 1799.0,
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      rating: 4.9,
      reviewCount: 892,
      inStock: false,
      category: 'televisions',
    },
    {
      id: '12',
      name: 'Bose QuietComfort Earbuds II',
      description:
        'Wireless in-ear headphones with personalized noise cancellation and up to 6 hours of battery',
      price: 279.0,
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
      rating: 4.5,
      reviewCount: 1234,
      inStock: true,
      category: 'audio',
    },
    {
      id: '13',
      name: 'GoPro HERO12 Black',
      description:
        '5.3K action camera with HyperSmooth 6.0 stabilization and water resistance up to 10m',
      price: 399.99,
      imageUrl: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=500',
      rating: 4.6,
      reviewCount: 956,
      inStock: true,
      category: 'cameras',
    },
    {
      id: '14',
      name: 'Logitech MX Master 3S',
      description:
        'Ergonomic wireless mouse with 8000 DPI sensor and up to 70 days of battery life',
      price: 99.99,
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      rating: 4.8,
      reviewCount: 2341,
      inStock: true,
      category: 'accessories',
    },
    {
      id: '15',
      name: 'DJI Mini 3 Pro',
      description:
        'Compact drone with 4K/60fps camera, 34 minutes of flight time and obstacle detection',
      price: 759.0,
      imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
      rating: 4.7,
      reviewCount: 567,
      inStock: true,
      category: 'drones',
    },
    {
      id: '16',
      name: 'Fitbit Charge 6',
      description:
        'Activity tracker with built-in GPS, heart rate monitoring and 7 days of battery life',
      price: 159.95,
      imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
      rating: 4.4,
      reviewCount: 1876,
      inStock: true,
      category: 'wearables',
    },
    {
      id: '17',
      name: 'PlayStation 5 Digital Edition',
      description: 'Next-generation gaming console with ultra-fast SSD and 4K graphics',
      price: 449.99,
      imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
      rating: 4.9,
      reviewCount: 3456,
      inStock: false,
      category: 'gaming',
    },
    {
      id: '18',
      name: 'Nespresso Vertuo Next',
      description:
        'Capsule coffee maker with Centrifusion technology and brewing in 5 different sizes',
      price: 179.0,
      imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
      rating: 4.3,
      reviewCount: 1092,
      inStock: true,
      category: 'appliances',
    },
    {
      id: '19',
      name: 'Samsung Galaxy Watch 6',
      description:
        'Smartwatch with Super AMOLED display, advanced sleep monitoring and 5ATM water resistance',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
      rating: 4.6,
      reviewCount: 1456,
      inStock: true,
      category: 'wearables',
    },
    {
      id: '20',
      name: 'Razer BlackWidow V4 Pro',
      description:
        'RGB mechanical gaming keyboard with Green switches, command dial and magnetic wrist rest',
      price: 229.99,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      rating: 4.7,
      reviewCount: 789,
      inStock: true,
      category: 'gaming',
    },
  ]);

  filteredProducts = computed(() => {
    if (this.category() === 'all') return this.products();

    return this.products().filter((p) => p.category === this.category().toLowerCase());
  });

  addToCart(product: Product) {
    console.log('Adding to cart:', product);
  }

  categories = signal<string[]>([
    'all',
    'electronics',
    'computers',
    'audio',
    'tablets',
    'cameras',
    'wearables',
    'gaming',
    'home',
    'e-readers',
    'televisions',
    'accessories',
    'drones',
    'appliances',
  ]);
}
