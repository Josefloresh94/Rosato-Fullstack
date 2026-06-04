import { inject, Injectable, TemplateRef } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class Toaster {
  toaster = inject(HotToastService);

  success(message: string) {
    this.toaster.success(message);
  }

  error(message: string) {
    this.toaster.error(message);
  }

  showConfirm(template: TemplateRef<any>) {
    return this.toaster.show(template, {
      autoClose: false,
      dismissible: true,
      icon: '🗑️',
      style: { padding: '14px', minWidth: '300px' },
    });
  }
}
