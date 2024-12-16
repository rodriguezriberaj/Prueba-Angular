import { inject } from "@angular/core";
import { AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";

import { ProductService } from "../services/product.service";

export function IsValidId(): AsyncValidatorFn {
  const productService = inject(ProductService);
  return (control) => productService.verifyId(control.value).pipe(
    map((exist) => exist ? {existId: true} : null)
  )
}
