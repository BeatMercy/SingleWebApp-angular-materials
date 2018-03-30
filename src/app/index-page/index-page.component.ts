import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { ProductRetrieveService } from '../product-retrieve.service';
import { Product, PRODUCTS } from '../entity/product';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  products: Product[];
  searchControl = new FormControl();
  private searchTerms = new Subject<string>();

  options = [
    new Product('小型车洗车'),
    new Product('小型车洗车'),
    new Product('大型车洗车')
  ];
  product$: Observable<Product[]>;

  constructor(
    private productRetrieveService: ProductRetrieveService
  ) { }

  ngOnInit() {
    this.products = PRODUCTS;
    // this.getProducts();
    this.product$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchFromProducts(term)),
    );
  }

  toggleSearchResult(show: boolean) {
    if (!show) {
      document.getElementById('searchResult').classList.add('disappear');
    } else {
      document.getElementById('searchResult').classList.remove('disappear');
    }
  }

  searchFromProducts(term: string): Observable<Product[]> {
    let result = new Array<Product>();
    this.products.forEach(product => {
      if (product.name === term) {
        result.push(product);
      }
    });
    return of(result);
  }

  search(term: string): void {
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

