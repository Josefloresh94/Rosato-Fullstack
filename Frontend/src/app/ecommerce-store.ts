import { Product } from "./models/product"
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { computed, inject } from "@angular/core";
import { produce } from "immer";
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "./components/sign-in-dialog/sign-in-dialog";
import { SignInParams, SignUpParams, User } from "./models/user";
import { Router } from "@angular/router";
import { Order } from "./models/order";
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export type EcommerceStore = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
}

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },

  withState({
    products: [
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
        description:
          'Premium smartphone with integrated S Pen, 200MP camera and 6.8" AMOLED display',
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
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
  } as EcommerceStore),

  withStorageSync({
    key: 'modern-store',
    select: ({wishlistItems, cartItems, user}) => ({ wishlistItems, cartItems, user})
  }),

  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),
  })),

  withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({

    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),

    addToWishlist: (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      });
      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success(`${product.name} added to wishlist!`);
    },

    removeFromWishList: (product: Product) => {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
      });
      toaster.success(`${product.name} removed from wishlist!`);
    },

    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
    },

    addToCart: (product: Product, quantity = 1) => {
      const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);

      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if (existingItemIndex !== -1){
          draft[existingItemIndex].quantity += quantity;
          return;
        }

        draft.push({product,quantity})
      })
      patchState(store, { cartItems: updatedCartItems });
      toaster.success(existingItemIndex !== -1 ? `${product.name} added again in cart!` : `${product.name} added to cart!`);
    },

    setItemQuantity(params: {productId: string, quantity: number}){
      const index = store.cartItems().findIndex(c => c.product.id === params.productId);
      const updated = produce(store.cartItems(), (draft) => {
        draft[index].quantity = params.quantity;
      });

      patchState(store, { cartItems: updated});
    },

    addAllWishlistToCart: () => {
      const addedIds: string[] = [];
      const skippedNames: string[] = [];

      const updatedCartItems = produce(store.cartItems(), (draft) => {
        store.wishlistItems().forEach((p) => {
          // skip products that are out of stock
          if (!p.inStock) {
            skippedNames.push(p.name);
            return;
          }

          const existing = draft.find((c) => c.product.id === p.id);
          if (!existing) {
            draft.push({ product: p, quantity: 1 });
            addedIds.push(p.id);
          } else {
            // if already in cart, increment quantity
            existing.quantity += 1;
            addedIds.push(p.id);
          }
        });
      });

      // remove only the items that were actually moved to cart
      const updatedWishlistItems = store.wishlistItems().filter((p) => !addedIds.includes(p.id));

      patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });

      if (addedIds.length > 0) {
        toaster.success(`${addedIds.length} item(s) moved from wishlist to cart.`);
      }
      if (skippedNames.length > 0) {
        toaster.error(
          `${skippedNames.join(', ')} ${skippedNames.length === 1 ? 'is' : 'are'} out of stock and remain in your wishlist.`,
        );
      }
    },

    moveToWishlist: (product: Product) => {
      const updatedCartItems = store.cartItems().filter((p => p.product.id !== product.id));
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find(p => p.id === product.id)){
          draft.push(product)
        }
      })
      patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
    },

    removeFromCart: (product: Product) => {
      patchState(store, {
        cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
      });
    },

    procedeToCheckout: () => {
      if (!store.user()) {
        matDialog.open(SignInDialog, {
          disableClose: true,
          data: {
            checkout: true
          },
        });
        return;
      }

      router.navigate(['/checkout'])
    },

    placeOrder: async() => {
      patchState(store, { loading: true });

      const user = store.user();

      if(!user){
        toaster.error('Please login before placing order');
        patchState(store, {loading: false});
        return;
      }

      const order: Order = {
        id: crypto.randomUUID(),
        userId: user.id,
        total: Math.round(store
          .cartItems()
          .reduce((acc, item) => acc + item.quantity * item.product.price, 0)),
        items: store.cartItems(),
        paymentStatus: 'success',
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      patchState(store, { loading: false, cartItems: [], });
      router.navigate(['order-success']);
    },

    loading(){

    },

    signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
      });

      matDialog.getDialogById(dialogId)?.close();

      if(checkout){
        router.navigate(['/checkout']);
      }
    },

    signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
      });

      matDialog.getDialogById(dialogId)?.close();

      if(checkout){
        router.navigate(['/checkout']);
      }
    },

    signOut(){
      patchState(store, { user: undefined });
    },

  }))
);
