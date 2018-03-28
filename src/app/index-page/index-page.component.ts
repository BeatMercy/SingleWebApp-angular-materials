import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

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

  options = [
    new Product('小型车洗车'),
    new Product('小型车洗车'),
    new Product('大型车洗车')
  ];
  filteredOptions: Observable<Product[]>;
  constructor(
    private productRetrieveService: ProductRetrieveService
  ) { }

  ngOnInit() {
    this.products = PRODUCTS;
    // this.getProducts();
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.options.slice())
      );
  }


  filter(name: string): Product[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(user?: Product): string | undefined {
    return user ? user.name : undefined;
  }
  getProducts() {
    this.productRetrieveService.getAllProduct().subscribe(
      products => {
        this.products = products;
      }
    );
  }
}

