import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormErrors } from '../models/form-validation-errors';


@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {

    private isEmpty = function isEmpty(value: unknown): boolean {
        if (typeof value === 'number' || typeof value === 'boolean') {
            return false;
        }
        if (typeof value === 'undefined' || value === null) {
            return true;
        }
        if (value instanceof Date) {
            return false;
        }
        if (value instanceof Object && !Object.keys(value).length) {
            return true;
        }
        if (Array.isArray(value)) {
            if (value.length === 0) {
            return true;
            }
            if (value.every(item => isEmpty(item))) {
            return true;
            }
        }
        if (value === '') {
            return true;
        }
        
        return false;
    }

    public getErrorMessage(errors?: ValidationErrors | null): string {
        if (!errors || this.isEmpty(errors)) {
        return '';
        }
        const firstError = Object.keys(errors)[0];
        switch (firstError) {
        case 'required':
            return FormErrors.REQUIRED;
        case 'email':
            return FormErrors.EMAIL;
        case 'url':
            return FormErrors.URL;
        case 'min':
            return `${FormErrors.MIN}${errors['min'].min}`;
        case 'max':
            return `${FormErrors.MAX}${errors['max'].max}`;
        case 'minlength':
            return `${FormErrors.MINLENGTH}${errors['minlength'].requiredLength}`;
        case 'maxlength':
            return `${FormErrors.MAXLENGTH}${errors['maxlength'].requiredLength}`;
        case 'existId':
            return 'Este Id ya existe, use otro.'
        case 'date':
            return FormErrors.DATE;
    }
    return "Error desconocido";
  }
}
