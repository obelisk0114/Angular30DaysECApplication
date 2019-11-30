import { Component, OnInit } from '@angular/core';

import { IProduct, ProductEntity } from '../product';
import { RetrieveProductsService } from '../retrieve-products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  /**
   * Will get all products from backend
   */
  productLists: IProduct[] = [];

  filteredProduct = [
    {
      id: 1,
      type: 'today',
      name: '水果優格',
      price: 150,
      imageUrl: 'brenda-godinez-228182-unsplash.jpg'
    },
    {
      id: 9,
      type: 'today',
      name: '糖衣甜甜圈',
      price: 50,
      imageUrl: 'heather-schwartz-493946-unsplash.jpg'
    },
    {
      id: 3,
      type: 'today',
      name: '綜合莓塔',
      price: 200,
      imageUrl: 'brooke-lark-96398-unsplash.jpg'
    },
    {
      id: 5,
      type: 'today',
      name: '肉桂派',
      price: 120,
      imageUrl: 'food-photographer-jennifer-pallian-137621-unsplash.jpg'
    },
    {
      id: 8,
      type: 'today',
      name: '覆盆子蛋糕',
      price: 150,
      imageUrl: 'food-photographer-jennifer-pallian-650641-unsplash.jpg'
    },
    {
      id: 6,
      type: 'today',
      name: '草莓冰淇淋',
      price: 80,
      imageUrl: 'food-photographer-jennifer-pallian-306895-unsplash.jpg'
    }
  ];

  type = 'default';
  productPerPage = 6;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private retrieveProductsService: RetrieveProductsService) { }

  ngOnInit() {
    /// TODO: define productLists
    let type;
    let proto = this.route.paramMap.subscribe(
      params => {
        type = params.get('type');
      }
    ); 
    //let type = this.route.snapshot.paramMap.get('type');
    //console.log(proto);
    console.log(type);
    console.log(5/3);
    console.log(this.route.routeConfig);

    this.retrieveProductsService.getProducts().subscribe({
      next: productLists => {
        this.productLists = productLists;
        this.filteredProduct = this.productLists;
      },
      error: err => this.errorMessage = err
    });

  }

  setType(type: string): void {
    this.type = type;
    this.setFilteredProduct(type);
  }

  setFilteredProduct(type: string): void {
    this.filteredProduct = this.productLists.filter(product => product.type === type);
  }

}
