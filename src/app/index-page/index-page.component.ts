import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, map
} from 'rxjs/operators';

import { ProductRetrieveService } from '../product-retrieve.service';
import { Product, PRODUCTS } from '../entity/product';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  products: Product[];
  private searchTerms = new Subject<string>();
  images;
  resultState = true;
  searchMode = false;
  product$: Observable<Product[]>;

  constructor(
    private _http: HttpClient,
    private productRetrieveService: ProductRetrieveService
  ) { }

  ngOnInit() {
    this.products = PRODUCTS;
    // this.getProducts();
    this.product$ = this.searchTerms.pipe(
      // 等待300毫秒输入搜索关键字
      debounceTime(300),
      // 忽略相同的搜索字段
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchFromHome(term))
    );

    this._http.get('/home/carousel')
      .pipe()
      .subscribe(images => { this.images = images; });
  }

  searchFromHome(term: string): Observable<Product[]> {
    const s = this.productRetrieveService.findProductFromHome(term);
    s.subscribe((next) => {
      this.resultState = true;
    });
    return s;
  }

  searchFromProducts(term: string): Observable<Product[]> {
    const result = new Array<Product>();
    this.products.forEach(product => {
      if (product.name === term) {
        result.push(product);
      }
    });
    this.resultState = true;
    return of(result);
  }

  search(term: string): void {
    this.resultState = false;
    this.searchTerms.next(term);
  }
  searchBlur(searchBoxValue: string) {
    if (searchBoxValue === '') {
      this.searchMode = false;
    }
  }

  getProducts() {
    this.productRetrieveService.getAllProduct().subscribe(
      products => {
        this.products = products;
      }
    );
  }
}

