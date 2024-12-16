import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductFormService } from '../../services/product-form.service';
import { FormProductComponent } from '../form-product/form-product.component';
import { FormButtonComponent } from '../../../../shared/ui/components/form-button/form-button.component';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    FormProductComponent,
    FormButtonComponent
],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent {
  subscriptions: Array<Subscription> = [];

  @ViewChild(FormProductComponent)
  private formRef!: FormProductComponent;

  get revision() {
    return this.formRef ? this.formRef.revision() : '';
  }

  constructor(
    private readonly formService: ProductFormService
  ) {
    this.formService.createProduct();
  }
}

