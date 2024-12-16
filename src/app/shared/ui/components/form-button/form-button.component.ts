import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ButtonComponent } from '../button/button.component';
import { ProductFormService } from '../../../../modules/product/services/product-form.service';
import { ProductService } from '../../../../modules/product/services/product.service';

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
],
  templateUrl: './form-button.component.html',
  styleUrl: './form-button.component.css',
})
export class FormButtonComponent implements OnDestroy {
  subscriptions: Array<Subscription> = [];
  @Input()
  revision = '';

  @Input({ required: false })
  @Input({ required: false })
  id = '';

  get load$() {
    return this.productService.load$;
  }

  get form() {
    return this.productFormService.form;
  }

  constructor(
    private readonly productFormService: ProductFormService,
    private readonly productService: ProductService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }

  public resetForm() {
    this.form.reset();
  }

  public save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.subscriptions.push(
      this.productService.guardar(this.productFormService.createModel(this.revision)).subscribe({
        complete: () => {
          this.resetForm();
        },
      })
    );
  }
}

