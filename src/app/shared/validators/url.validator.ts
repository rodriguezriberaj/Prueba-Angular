import { ValidatorFn } from "@angular/forms";
import { urlRegex } from "../utils/url-regex";

export function isValidUrl(): ValidatorFn {
  return (control) => urlRegex.test(control.value) ? null : { url: true }
}