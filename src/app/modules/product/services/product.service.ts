import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, tap } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { ProductMapper } from '../mappers/product-mapper';
import { BaseResponse } from '../../../shared/dtos/base-response';
import { ID } from '../models/base-model';
import { ToastService } from '../../../shared/services/toast.service';
import { ProductResponse, ProductSaveResponse } from '../dtos/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly url = '/bp/products';
  private productsSubject: BehaviorSubject<Array<Product>>;
  private loadSubject = new BehaviorSubject<boolean>(false);
  load$ = this.loadSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly mapper: ProductMapper,
    private readonly toast: ToastService
  ) {
    const vacio: Array<Product> = [];
    this.productsSubject = new BehaviorSubject(vacio);
  }

  showLoading() {
    this.loadSubject.next(true);
  }

  hideLoading() {
    this.loadSubject.next(false);
  }

  get(): Observable<Product[]> {
    this.showLoading();
    return this.http.get<ProductResponse>(this.url).pipe(
      map((response) => {
        const products = response.data ?? [];
        return products.map((p) => this.mapper.dtoToModel(p))
      }),
      tap((products) => this.productsSubject.next(products)),
      finalize(() => this.hideLoading())
    );
  }

  guardar(datos: Product): Observable<string> {
    const cuerpo = this.mapper.modelToDto(datos);
    this.showLoading();
    return this.http.post<ProductSaveResponse>(this.url, cuerpo).pipe(
      map((response) => response.message ?? ''),
      tap(this.ShowToastSuccess.bind(this)),
      finalize(() => this.hideLoading())
    );
  }

  search(search: string) {
    search = search.toLowerCase();
    return this.productsSubject.asObservable().pipe(
      map((productos) => productos.filter((p) => p.name.toLowerCase().includes(search)))
    );
  }

  verifyId(id: ID) {
    return this.http.get<boolean>(`${this.url}/verification/${id}`)
  }

  private ShowToastSuccess(message: string) {
    this.toast.add({
      message: message,
      type: 'success'
    })
  }
}