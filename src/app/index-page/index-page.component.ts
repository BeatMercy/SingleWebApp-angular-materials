import { Component, OnInit } from '@angular/core';
import { ProductRetrieveService } from '../product-retrieve.service';
import { Product } from '../entity/product';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  products: Product[];

  constructor(
    private productRetrieveService: ProductRetrieveService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productRetrieveService.getAllProduct().subscribe(
      products => {
        this.products = products;
      }
    );
  }

}
