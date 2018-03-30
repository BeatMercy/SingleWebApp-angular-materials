import { Component, OnInit, trigger, state, transition, style, animate } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
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
  styleUrls: ['./index-page.component.css'],
  animations: [
    trigger('indexAnimation', [
      state('showUp', style({
        opacity: 1
      })),
      state('disappear', style({
        opacity: 0
      })),
      transition('showUp <=> disappear', animate('300ms ease-in'))
    ])
  ]
})
export class IndexPageComponent implements OnInit {
  products: Product[];
  private searchTerms = new Subject<string>();
  images: Array<string>;
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
      switchMap((term: string) => this.searchFromProducts(term))
    );

    this._http.get('https://picsum.photos/list')
      .pipe(map((images: Array<{ id: number }>) => this._randomImageUrls(images)))
      .subscribe(images => this.images = images);
  }

  private _randomImageUrls(images: Array<{ id: number }>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return 'https://picsum.photos/900/500?image=' + randomId;
    });
  }

  searchFromProducts(term: string): Observable<Product[]> {
    let result = new Array<Product>();
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

  getProducts() {
    this.productRetrieveService.getAllProduct().subscribe(
      products => {
        this.products = products;
      }
    );
  }
}

