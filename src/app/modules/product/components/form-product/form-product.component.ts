import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProductFormService } from '../../services/product-form.service';
import { DateUtils } from '../../../../shared/utils/date';
import { InputTextComponent } from '../../../../shared/ui/components/input-text/input-text.component';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent
  ],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css',
})
export class FormProductComponent implements OnDestroy, OnInit {
  subscriptions: Array<Subscription> = [];
  revision: WritableSignal<string> = signal('');

  @Input({ required: false })

  get form() {
    return this.productFormService.form;
  }

  constructor(
    private readonly productFormService: ProductFormService
  ) {
    this.subscriptions.push(
      this.productFormService.form.get('releaseDate')!.valueChanges.subscribe((value) => {
        if (Boolean(value)) this.calculateRevision(value);
        else
          this.revision.set('');
      })
    );
  }

  private calculateRevision(value: string) {
    const date = new Date(Date.parse(value));
    const time = new Date(date.getTime() + 31556952000);
    this.revision.set(DateUtils.inputFormat(time));
  }

  ngOnInit(): void {
    this.form.get('id')?.enable();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }
}

