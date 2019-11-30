import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product-section/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  defaultProducts: IProduct[] = [
    {
      id: 8,
      type: "today",
      name: "糖衣甜甜圈",
      price: 50,
      imageUrl: "heather-schwartz-493946-unsplash.jpg"
    },
    {
      id: 7,
      type: "today",
      name: "覆盆子蛋糕",
      price: 150,
      imageUrl: "food-photographer-jennifer-pallian-650641-unsplash.jpg"
    },
    {
      id: 12,
      type: "new",
      name: "藍莓優格",
      price: 100,
      imageUrl: "rezel-apacionado-362238-unsplash.jpg"
    }
  ];

  showedProducts: IProduct[] = this.defaultProducts;

  constructor() { }

  ngOnInit() {
  }

}
