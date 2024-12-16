import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
  } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error.service';
  
  
  @Directive({
    selector: '[coreFormInputError]',
    standalone: true,
  })
  export class FormInputErrorDirective implements OnInit {
    @Input()

    inputControl!: AbstractControl;
  
    private errorContainer: HTMLSpanElement;
  
    constructor(
      private readonly el: ElementRef,
      private readonly validationService: ValidationErrorService
    ) 
    {
      this.errorContainer = document.createElement('span');
      this.errorContainer.classList.add(...'errorMessage'.split(' '));
    }
  
    ngOnInit(): void {
      this.inputControl.statusChanges.subscribe(() => this.onValidateInput());
    }
  
    @HostListener('blur')
    onBlur() {
      const status = this.inputControl.status;
      if (status === 'INVALID') {
        this.invalidStatus();
      }
    }
  
    private onValidateInput() {
      const status = this.inputControl.status;
      if (status === 'INVALID') {
        this.invalidStatus();
      } else {
        this.validStatus();
      }
    }
  
    private invalidStatus() {
      const element = this.el.nativeElement as HTMLElement;
      const error = this.validationService.getErrorMessage(
        this.inputControl.errors!
      );
      this.errorContainer.textContent = error;
      element.parentNode?.append(this.errorContainer);
    }
  
    private validStatus() {
      const element = this.el.nativeElement as HTMLElement;
      if (element.parentNode?.lastChild === this.errorContainer)
        element.parentNode?.removeChild(this.errorContainer);
    }
  }
  