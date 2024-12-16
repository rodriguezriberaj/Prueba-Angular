import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { ProductCreate } from '../models/product-create.model';
import { isCurrenDate } from '../../../shared/validators/current-date.validator';
import { IsValidId } from '../validators/product-id.validator';
import { isValidUrl } from '../../../shared/validators/url.validator';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  private ProductCreate!: FormGroup<ProductCreate>;

  get form() {
    return this.ProductCreate;
  }

  constructor(private readonly fb: FormBuilder) { }

  public createProduct() {
    this.ProductCreate = this.fb.group({
      description: new FormControl('', {
        nonNullable: true,
        validators: [Validators.minLength(10), Validators.maxLength(200), Validators.required]
      }),
      releaseDate: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, isCurrenDate()]
      }),
      id: new FormControl('', {
        nonNullable: true,
        validators: [Validators.minLength(3), Validators.maxLength(10), Validators.required],
        asyncValidators: [IsValidId()]
      }),
      logo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, isValidUrl()]
      }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.minLength(5), Validators.maxLength(100), Validators.required],
      }),
    });
  }

  public createModel(revision: string): Product {
    return {
      description: this.ProductCreate.get('description')!.value,
      releaseDate: new Date(this.ProductCreate.get('releaseDate')!.value),
      revisionDate: new Date(revision),
      id: this.ProductCreate.get('id')!.value,
      logo: this.ProductCreate.get('logo')!.value,
      name: this.ProductCreate.get('name')!.value,
    };
  }
}
