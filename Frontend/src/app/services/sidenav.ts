import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Sidenav {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((state) => !state);
  }

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}
