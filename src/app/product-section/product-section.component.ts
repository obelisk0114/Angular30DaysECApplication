import { Component, OnInit } from '@angular/core';
import { productType } from './product-type.const';
import { RetrieveProductsService } from './retrieve-products.service';

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

  productCount: number = 48;
  productTodayCount: number = 10;
  productPopularCount: number = 26;
  productNewCount: number = 12;

  constructor(private retrieveProductService: RetrieveProductsService) { }

  ngOnInit() {
    this.retrieveProductService.getProductsCount().subscribe((count: number) => this.productCount = count);
    this.retrieveProductService.getProductsCountByType("today").subscribe((count: number) => this.productTodayCount = count);
    this.retrieveProductService.getProductsCountByType("popular").subscribe((count: number) => this.productPopularCount = count);
    this.retrieveProductService.getProductsCountByType("new").subscribe((count: number) => this.productNewCount = count);
  }

}
