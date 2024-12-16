import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../modules/product/models/product';
import { ProductService } from '../../../../modules/product/services/product.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ProgressBarComponent,
],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit, OnChanges {
  @Input({ required: true })
  search = '';

  public products$!: Observable<Product[]>;
  public filteredProducts$!: Observable<Product[]>;

  get load$() {
    return this.servicio.load$;
  }

  constructor(private readonly servicio: ProductService){}

  ngOnInit(): void {
    this.products$ = this.servicio.get();
    this.filteredProducts$ = this.servicio.search('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredProducts$ = this.servicio.search(changes['search'].currentValue);
  }
}
