import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { Product } from '../models/product'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayColumns: string[] = ['prod_name', 'prod_price', 'updated_at']
  data: Product[] = [];
  isLoadingResults = true;
  value = '';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.api.getProducts().subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    })
  }

  filterProducts(){
    this.api.filterProducts(this.value).subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    })
  }

}
