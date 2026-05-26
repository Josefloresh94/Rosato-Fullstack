import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CategoryApi {
  private categories = [
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
  ];

  getCategories(){
    return this.categories;
  }
}
