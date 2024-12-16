import { FormControl } from "@angular/forms";

export type ProductCreate = {
  id: FormControl<string>,
  name: FormControl<string>;
  description: FormControl<string>;
  logo: FormControl<string>;
  releaseDate: FormControl<string>;
};
