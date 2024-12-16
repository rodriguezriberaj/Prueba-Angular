import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextComponent } from '../../../../shared/ui/components/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../../../../shared/ui/components/product-table/product-table.component';
import { ButtonComponent } from '../../../../shared/ui/components/button/button.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    FormsModule,
    InputTextComponent,
    ReactiveFormsModule,
    ProductTableComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  public search = new FormControl('');

  constructor(private readonly router: Router) {}

  public onCreateClick() {
    this.router.navigate(['/create']);
  }
}
