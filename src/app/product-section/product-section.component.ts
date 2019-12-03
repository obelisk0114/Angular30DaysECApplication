import { Component, OnInit } from '@angular/core';
import { productType } from './product-type.const';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.css']
})
export class ProductSectionComponent implements OnInit {

  /**
   * 給 Template 用的路由定義
   *
   * @memberof ProductSectionComponent
   */
  productType = productType;

  constructor() { }

  ngOnInit() {
  }

}
