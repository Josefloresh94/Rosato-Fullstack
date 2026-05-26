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
import { AddReviewParams, UserReview } from "./models/user-review";

export type EcommerceStore = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean;
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
        imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500', // Imagen corregida
        rating: 4.8,
        reviewCount: 4,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'r1-1',
            productId: '1',
            userName: 'Alex Simpson',
            userImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
            rating: 5,
            title: 'Incredible performance',
            comment:
              'The camera upgrades and the titanium build make this the best iPhone in years. The battery life is spectacular.',
            reviewDate: new Date('2026-02-15'),
          },
          {
            id: 'r1-2',
            productId: '1',
            userName: 'Elena Rostova',
            userImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            rating: 5,
            title: 'Amazing Display',
            comment:
              'The display is bright even under direct sunlight. Action button is surprisingly useful.',
            reviewDate: new Date('2026-03-10'),
          },
          {
            id: 'r1-3',
            productId: '1',
            userName: 'Marcus Vance',
            userImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
            rating: 4,
            title: 'Great but expensive',
            comment:
              'Top-tier phone overall. However, the charging speed could be faster for this price point.',
            reviewDate: new Date('2026-04-01'),
          },
          {
            id: 'r1-4',
            productId: '1',
            userName: 'Sophia Lin',
            userImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
            rating: 5,
            title: 'Flawless Zoom',
            comment:
              'The 5x optical zoom lens captures crisp details. Ideal for mobile photographers.',
            reviewDate: new Date('2026-05-12'),
          },
        ],
      },
      {
        id: '2',
        name: 'MacBook Air M3',
        description:
          'Ultra-thin laptop with M3 chip, 13.6" Liquid Retina display, 8GB RAM and 256GB SSD',
        price: 1099.0,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        rating: 4.9,
        reviewCount: 3,
        inStock: true,
        category: 'computers',
        reviews: [
          {
            id: 'r2-1',
            productId: '2',
            userName: 'David Miller',
            userImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            rating: 5,
            title: 'Silent powerhouse',
            comment:
              'Completely silent, runs extremely cool, and handles all my multi-tasking data workflows flawlessly.',
            reviewDate: new Date('2026-04-20'),
          },
          {
            id: 'r2-2',
            productId: '2',
            userName: 'Sarah Jenkins',
            userImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
            rating: 5,
            title: 'Perfect for travel',
            comment:
              'Unbelievably light weight with a battery that literally lasts me the entire working day and more.',
            reviewDate: new Date('2026-05-02'),
          },
          {
            id: 'r2-3',
            productId: '2',
            userName: 'Brian O Connor',
            userImageUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100',
            rating: 4,
            title: 'Needs more base RAM',
            comment:
              'Runs wonderfully, but Apple should standardise 16GB RAM for future-proofing at this base cost.',
            reviewDate: new Date('2026-05-18'),
          },
        ],
      },
      {
        id: '3',
        name: 'Sony WH-1000XM5',
        description:
          'Wireless headphones with industry-leading noise cancellation and up to 30 hours of battery life',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        rating: 4.7,
        reviewCount: 3,
        inStock: true,
        category: 'audio',
        reviews: [
          {
            id: 'r3-1',
            productId: '3',
            userName: 'Chris Evans',
            userImageUrl: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=100',
            rating: 5,
            title: 'Silence on demand',
            comment:
              'The active noise cancellation blocks everything out on long flights. Sound stage is super balanced.',
            reviewDate: new Date('2026-01-11'),
          },
          {
            id: 'r3-2',
            productId: '3',
            userName: 'Diana Prince',
            userImageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100',
            rating: 4,
            title: 'Great sound, weird case',
            comment:
              'Audio quality is pristine, but I preferred the folding mechanism of the older XM4 model.',
            reviewDate: new Date('2026-02-28'),
          },
          {
            id: 'r3-3',
            productId: '3',
            userName: 'Nathan Drake',
            userImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
            rating: 5,
            title: 'Mic quality is top tier',
            comment:
              'Crystal clear voice calls even when walking outside in windy conditions. Highly recommended.',
            reviewDate: new Date('2026-03-15'),
          },
        ],
      },
      {
        id: '4',
        name: 'Samsung Galaxy S24 Ultra',
        description:
          'Premium smartphone with integrated S Pen, 200MP camera and 6.8" AMOLED display',
        price: 1299.99,
        imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        rating: 4.6,
        reviewCount: 2,
        inStock: false,
        category: 'electronics',
        reviews: [
          {
            id: 'r4-1',
            productId: '4',
            userName: 'John Doe',
            userImageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
            rating: 5,
            title: 'Screen is unmatched',
            comment:
              'The anti-reflective glass display completely alters the viewing experience for the better.',
            reviewDate: new Date('2026-03-22'),
          },
          {
            id: 'r4-2',
            productId: '4',
            userName: 'Jane Watson',
            userImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
            rating: 4,
            title: 'Excellent productivity tool',
            comment:
              'The built-in S-Pen makes signing dynamic documents and taking notes fast and precise.',
            reviewDate: new Date('2026-04-19'),
          },
        ],
      },
      {
        id: '5',
        name: 'iPad Pro 12.9"',
        description:
          'Professional tablet with M2 chip, Liquid Retina XDR display and Apple Pencil compatibility',
        price: 1099.0,
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        rating: 4.8,
        reviewCount: 2,
        inStock: true,
        category: 'tablets',
        reviews: [
          {
            id: 'r5-1',
            productId: '5',
            userName: 'Lucas Scott',
            userImageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
            rating: 5,
            title: 'A digital canvas',
            comment:
              'The Mini-LED display has insane contrast levels. Working with illustrations here is smooth.',
            reviewDate: new Date('2026-01-30'),
          },
          {
            id: 'r5-2',
            productId: '5',
            userName: 'Mia Wong',
            userImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
            rating: 4,
            title: 'Laptop replacement hardware',
            comment:
              'The hardware limits are non-existent, though iPadOS still feels restricted for true code compiling.',
            reviewDate: new Date('2026-05-05'),
          },
        ],
      },
      {
        id: '6',
        name: 'Canon EOS R6 Mark II',
        description: 'Full-frame mirrorless camera with 24.2MP, 4K 60fps video recording',
        price: 2499.0,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500', // Imagen corregida
        rating: 4.9,
        reviewCount: 2,
        inStock: true,
        category: 'cameras',
        reviews: [
          {
            id: 'r6-1',
            productId: '6',
            userName: 'Peter Parker',
            userImageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100',
            rating: 5,
            title: 'Best autofocus out there',
            comment:
              'The subject tracking handles sports and fast-moving targets perfectly without missing focus once.',
            reviewDate: new Date('2026-03-05'),
          },
          {
            id: 'r6-2',
            productId: '6',
            userName: 'Gwen Stacy',
            userImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
            rating: 5,
            title: 'Incredible low light performance',
            comment:
              'Very clean files up to ISO 6400. Video capabilities are crisp and don’t overheat easily.',
            reviewDate: new Date('2026-04-14'),
          },
        ],
      },
      {
        id: '7',
        name: 'Apple Watch Series 9',
        description: 'Smartwatch with Always-On display, advanced health sensors and built-in GPS',
        price: 399.0,
        imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
        rating: 4.7,
        reviewCount: 3,
        inStock: true,
        category: 'wearables',
        reviews: [
          {
            id: 'r7-1',
            productId: '7',
            userName: 'Tony Stark',
            userImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
            rating: 4,
            title: 'The double-tap gesture rules',
            comment:
              'Using the watch one-handed while carrying items is immensely useful. Health sensors are spot on.',
            reviewDate: new Date('2026-02-18'),
          },
          {
            id: 'r7-2',
            productId: '7',
            userName: 'Natasha Romanoff',
            userImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
            rating: 5,
            title: 'Great fitness companion',
            comment:
              'Accurately tracks my heart rate zones and sports metrics. Dictation responses are immediate.',
            reviewDate: new Date('2026-04-22'),
          },
          {
            id: 'r7-3',
            productId: '7',
            userName: 'Bruce Banner',
            userImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
            rating: 5,
            title: 'Excellent sleep metrics',
            comment:
              'Gives precise structural feedback about deep sleep stages. Charging is fast enough to wear daily.',
            reviewDate: new Date('2026-05-10'),
          },
        ],
      },
      {
        id: '8',
        name: 'Nintendo Switch OLED',
        description: 'Hybrid gaming console with 7" OLED screen, 64GB of storage',
        price: 349.99,
        imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
        rating: 4.8,
        reviewCount: 2,
        inStock: true,
        category: 'gaming',
        reviews: [
          {
            id: 'r8-1',
            productId: '8',
            userName: 'Link Hero',
            userImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
            rating: 5,
            title: 'The screen is gorgeous',
            comment:
              'Playing hand-held mode feels like a complete generation leap. Colors pop brilliantly.',
            reviewDate: new Date('2026-01-05'),
          },
          {
            id: 'r8-2',
            productId: '8',
            userName: 'Zelda Hyrule',
            userImageUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100',
            rating: 4,
            title: 'Sturdier kickstand',
            comment:
              'The new kickstand design makes tabletop play reliable. Internals are the same but the screen makes up for it.',
            reviewDate: new Date('2026-03-25'),
          },
        ],
      },
      {
        id: '9',
        name: 'Dyson V15 Detect',
        description: 'Cordless vacuum cleaner with laser technology to detect microscopic dust',
        price: 649.99,
        imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
        rating: 4.6,
        reviewCount: 2,
        inStock: true,
        category: 'home',
        reviews: [
          {
            id: 'r9-1',
            productId: '9',
            userName: 'Monica Geller',
            userImageUrl: 'https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?w=100',
            rating: 5,
            title: 'Satisfyingly clean',
            comment:
              'The green laser revealing hidden dust particles is both horrifying and immensely satisfying.',
            reviewDate: new Date('2026-04-12'),
          },
          {
            id: 'r9-2',
            productId: '9',
            userName: 'Danny Tanner',
            userImageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100',
            rating: 4,
            title: 'Strong suction, a bit heavy',
            comment:
              'Incredible cleaning power on carpets. Wrist gets slightly fatigued after continuous usage.',
            reviewDate: new Date('2026-05-01'),
          },
        ],
      },
      {
        id: '10',
        name: 'Kindle Paperwhite',
        description: 'E-reader with 6.8" display, adjustable lighting and IPX8 water resistance',
        price: 139.99,
        imageUrl: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=500',
        rating: 4.7,
        reviewCount: 2,
        inStock: true,
        category: 'e-readers',
        reviews: [
          {
            id: 'r10-1',
            productId: '10',
            userName: 'Arthur Conan',
            userImageUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100',
            rating: 5,
            title: 'Easy on the eyes',
            comment:
              'Warm light settings make reading in the dark effortless. Charge lasts weeks at a time.',
            reviewDate: new Date('2026-02-27'),
          },
          {
            id: 'r10-2',
            productId: '10',
            userName: 'Hermione G.',
            userImageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100',
            rating: 4,
            title: 'Perfect pool companion',
            comment:
              'Waterproofing works perfectly. Pages turn fast and the contrast texture feels close to real paper.',
            reviewDate: new Date('2026-04-11'),
          },
        ],
      },
      {
        id: '11',
        name: 'LG OLED C3 55"',
        description: '4K OLED Smart TV with α9 Gen6 processor, HDMI 2.1 and Dolby Vision support',
        price: 1799.0,
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
        rating: 4.9,
        reviewCount: 2,
        inStock: false,
        category: 'televisions',
        reviews: [
          {
            id: 'r11-1',
            productId: '11',
            userName: 'Martin Scorsese',
            userImageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100',
            rating: 5,
            title: 'Perfect ink blacks',
            comment:
              'Cinematic quality is astonishing. Individual pixel control creates infinite depth for films.',
            reviewDate: new Date('2026-03-14'),
          },
          {
            id: 'r11-2',
            productId: '11',
            userName: 'Samus Aran',
            userImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
            rating: 5,
            title: 'Ultimate gaming display',
            comment:
              '120Hz refresh rate combined with low response time response gives a seamless playing edge.',
            reviewDate: new Date('2026-05-09'),
          },
        ],
      },
      {
        id: '12',
        name: 'Bose QuietComfort Earbuds II',
        description:
          'Wireless in-ear headphones with personalized noise cancellation and up to 6 hours of battery',
        price: 279.0,
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        rating: 4.5,
        reviewCount: 2,
        inStock: true,
        category: 'audio',
        reviews: [
          {
            id: 'r12-1',
            productId: '12',
            userName: 'Miles Davis',
            userImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
            rating: 5,
            title: 'Incredible deep bass',
            comment:
              'Fits firmly in the ear canal without discomfort. The ANC isolates sound beautifully.',
            reviewDate: new Date('2026-04-03'),
          },
          {
            id: 'r12-2',
            productId: '12',
            userName: 'Billie E.',
            userImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            rating: 4,
            title: 'Case is a bit bulky',
            comment:
              'The earbuds sound astonishing, but the charging case footprint could be smaller for tight pockets.',
            reviewDate: new Date('2026-04-29'),
          },
        ],
      },
      {
        id: '13',
        name: 'GoPro HERO12 Black',
        description:
          '5.3K action camera with HyperSmooth 6.0 stabilization and water resistance up to 10m',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=500',
        rating: 4.6,
        reviewCount: 2,
        inStock: true,
        category: 'cameras',
        reviews: [
          {
            id: 'r13-1',
            productId: '13',
            userName: 'Tony Hawk',
            userImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
            rating: 5,
            title: 'Rock solid video stability',
            comment:
              'HyperSmooth 6.0 handles harsh bumps seamlessly. HDR video recording tracks lighting transitions perfectly.',
            reviewDate: new Date('2026-02-25'),
          },
          {
            id: 'r13-2',
            productId: '13',
            userName: 'Lara Croft',
            userImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
            rating: 4,
            title: 'Solid build quality',
            comment:
              'Survives muddy impact falls and deep water submersion without any dedicated housing.',
            reviewDate: new Date('2026-05-14'),
          },
        ],
      },
      {
        id: '14',
        name: 'Logitech MX Master 3S',
        description:
          'Ergonomic wireless mouse with 8000 DPI sensor and up to 70 days of battery life',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        rating: 4.8,
        reviewCount: 3,
        inStock: true,
        category: 'accessories',
        reviews: [
          {
            id: 'r14-1',
            productId: '14',
            userName: 'Linus T.',
            userImageUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100',
            rating: 5,
            title: 'Ergonomic masterpiece',
            comment:
              'Hand fatigue vanished completely after switching. MagSpeed scroll wheel navigation is addictive.',
            reviewDate: new Date('2026-03-01'),
          },
          {
            id: 'r14-2',
            productId: '14',
            userName: 'Ada Lovelace',
            userImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
            rating: 5,
            title: 'Quiet clicks are great',
            comment:
              'Clicks are soft and muted, making it great for open office environments. Precise tracking across glass surfaces.',
            reviewDate: new Date('2026-04-18'),
          },
          {
            id: 'r14-3',
            productId: '14',
            userName: 'Tim Berners',
            userImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            rating: 4,
            title: 'Excellent multi-device workflow',
            comment:
              'Easy shifting switches between my running OS instances natively with no pairing delays.',
            reviewDate: new Date('2026-05-20'),
          },
        ],
      },
      {
        id: '15',
        name: 'DJI Mini 3 Pro',
        description:
          'Compact drone with 4K/60fps camera, 34 minutes of flight time and obstacle detection',
        price: 759.0,
        imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
        rating: 4.7,
        reviewCount: 2,
        inStock: true,
        category: 'drones',
        reviews: [
          {
            id: 'r15-1',
            productId: '15',
            userName: 'Casey N.',
            userImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
            rating: 5,
            title: 'No license required weight',
            comment:
              'Weighing under 249 grams makes traveling with it zero hassle. True vertical video shooting is exceptional.',
            reviewDate: new Date('2026-03-30'),
          },
          {
            id: 'r15-2',
            productId: '15',
            userName: 'Peter B.',
            userImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
            rating: 4,
            title: 'Great obstacle sensing',
            comment:
              'Tri-directional sensors saved me from cross-winds pushing it into branches. Transmission range is clean.',
            reviewDate: new Date('2026-05-02'),
          },
        ],
      },
      {
        id: '16',
        name: 'Fitbit Charge 6',
        description:
          'Activity tracker with built-in GPS, heart rate monitoring and 7 days of battery life',
        price: 159.95,
        imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
        rating: 4.4,
        reviewCount: 2,
        inStock: true,
        category: 'wearables',
        reviews: [
          {
            id: 'r16-1',
            productId: '16',
            userName: 'Usain B.',
            userImageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
            rating: 4,
            title: 'Very reliable step count',
            comment:
              'Sleek footprint doesn’t interfere with motion. Heart rate zone changes mirror intense sets smoothly.',
            reviewDate: new Date('2026-04-10'),
          },
          {
            id: 'r16-2',
            productId: '16',
            userName: 'Allyson F.',
            userImageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100',
            rating: 4,
            title: 'YouTube Music controls help',
            comment:
              'Integration controls make playlist tracking during outdoor run circuits quick and snappy.',
            reviewDate: new Date('2026-05-15'),
          },
        ],
      },
      {
        id: '17',
        name: 'PlayStation 5 Digital Edition',
        description: 'Next-generation gaming console with ultra-fast SSD and 4K graphics',
        price: 449.99,
        imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
        rating: 4.9,
        reviewCount: 2,
        inStock: false,
        category: 'gaming',
        reviews: [
          {
            id: 'r17-1',
            productId: '17',
            userName: 'Kratos S.',
            userImageUrl: 'https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?w=100',
            rating: 5,
            title: 'Zero load screens',
            comment:
              'Custom SSD architecture renders vast open worlds near instantaneously. DualSense haptics add real tactile immersion.',
            reviewDate: new Date('2026-01-20'),
          },
          {
            id: 'r17-2',
            productId: '17',
            userName: 'Aloy Meridian',
            userImageUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100',
            rating: 5,
            title: 'Sleek all-digital look',
            comment:
              'The symmetrical profile look is much more appealing than the disc unit version. Whisper quiet fan.',
            reviewDate: new Date('2026-02-14'),
          },
        ],
      },
      {
        id: '18',
        name: 'Nespresso Vertuo Next',
        description:
          'Capsule coffee maker with Centrifusion technology and brewing in 5 different sizes',
        price: 179.0,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
        rating: 4.3,
        reviewCount: 2,
        inStock: true,
        category: 'appliances',
        reviews: [
          {
            id: 'r18-1',
            productId: '18',
            userName: 'Dale Cooper',
            userImageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100',
            rating: 5,
            title: 'A damn fine cup of coffee',
            comment:
              'Centrifusion system builds a thick, luxurious crema layer automatically every morning.',
            reviewDate: new Date('2026-03-12'),
          },
          {
            id: 'r18-2',
            productId: '18',
            userName: 'Juan Valdez',
            userImageUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100',
            rating: 4,
            title: 'Fast brewing',
            comment:
              'Heats up instantly. Pod disposal mechanism functions cleanly. Wish alternative brand pods were supported.',
            reviewDate: new Date('2026-05-04'),
          },
        ],
      },
      {
        id: '19',
        name: 'Samsung Galaxy Watch 6',
        description:
          'Smartwatch with Super AMOLED display, advanced sleep monitoring and 5ATM water resistance',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
        rating: 4.6,
        reviewCount: 2,
        inStock: true,
        category: 'wearables',
        reviews: [
          {
            id: 'r19-1',
            productId: '19',
            userName: 'Michael Jordan',
            userImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
            rating: 5,
            title: 'Bezel movement is smooth',
            comment:
              'The interface is highly responsive. The comprehensive body composition scanning metric is very informative.',
            reviewDate: new Date('2026-02-28'),
          },
          {
            id: 'r19-2',
            productId: '19',
            userName: 'Serena W.',
            userImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
            rating: 4,
            title: 'Bright screen asset',
            comment:
              'Super easy to read custom layouts during mid-day outdoor workouts. Battery charges up very rapidly.',
            reviewDate: new Date('2026-04-15'),
          },
        ],
      },
      {
        id: '20',
        name: 'Razer BlackWidow V4 Pro',
        description:
          'RGB mechanical gaming keyboard with Green switches, command dial and magnetic wrist rest',
        price: 229.99,
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        rating: 4.7,
        reviewCount: 2,
        inStock: true,
        category: 'gaming',
        reviews: [
          {
            id: 'r20-1',
            productId: '20',
            userName: 'Faker Lee',
            userImageUrl: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=100',
            rating: 5,
            title: 'Highly responsive switches',
            comment:
              'Tactile bump feedback is crisp and helps prevent missed inputs. Media dial layout configuration is stellar.',
            reviewDate: new Date('2026-03-18'),
          },
          {
            id: 'r20-2',
            productId: '20',
            userName: 'Chovy J.',
            userImageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100',
            rating: 4,
            title: 'Plush wrist rest, bright RGB',
            comment:
              'The underglow lighting effects match key setups seamlessly. Wrist rest magnetic alignment snaps perfectly.',
            reviewDate: new Date('2026-05-11'),
          },
        ],
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  } as EcommerceStore),

  // withStorageSync({
  //   key: 'modern-store',
  //   select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  // }),

  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),

    wishlistCount: computed(() => wishlistItems().length),

    cartCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),

    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
  })),

  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
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
        const existingItemIndex = store.cartItems().findIndex((i) => i.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }

          draft.push({ product, quantity });
        });
        patchState(store, { cartItems: updatedCartItems });
        toaster.success(
          existingItemIndex !== -1
            ? `${product.name} added again in cart!`
            : `${product.name} added to cart!`,
        );
      },

      setItemQuantity(params: { productId: string; quantity: number }) {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });

        patchState(store, { cartItems: updated });
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
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
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
              checkout: true,
            },
          });
          return;
        }

        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please login before placing order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['order-success']);
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut() {
        patchState(store, { user: undefined });
      },

      showWriteReview: () => {
        patchState(store, { writeReview: true });
      },

      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },

      addReview: async ({ title, comment, rating }: AddReviewParams) => {
        patchState(store, { loading: true });
        const product = store.products().find((p) => p.id === store.selectedProductId());
        if(!product) {
          patchState(store, { loading: false });
          return;
        }

        const review: UserReview = {
          id: crypto.randomUUID(),
          title ,
          comment ,
          rating ,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.name || '',
          reviewDate: new Date(),
        };

        const updatedProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex((p) => p.id === product.id);
          draft[index].reviews.push(review);
          draft[index].rating =
            Math.round(
              (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) / draft[index].reviews.length) * 10
            ) / 10;
          draft[index].reviewCount = draft[index].reviews.length;
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, products: updatedProducts, writeReview: false })
        toaster.success('Review added successfully');
      },
    }),
  ),
);
