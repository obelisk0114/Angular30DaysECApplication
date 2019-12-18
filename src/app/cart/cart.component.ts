import { Component, OnInit } from '@angular/core';
import { appPath } from '../app-path.const';
import { PurchaseService } from '../product-section/purchase.service';
import { IProduct } from '../product-section/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  /**
   * 給 Template 用的路由定義
   *
   * @memberof CartComponent
   */
  path = appPath;

  selectedProducts: Map<number, IProduct>;
  price: number;
  shipping: number;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.selectedProducts = this.purchaseService.selectedProducts;
    this.price = this.purchaseService.price;
    this.shipping = this.purchaseService.shipping;
  }

  /**
   * 
   * @param productId id of the product
   * @memberof CartComponent
   */
  removeProduct(productId: number): void {
    this.purchaseService.removeProduct(productId);
    this.selectedProducts = this.purchaseService.selectedProducts;
    this.price = this.purchaseService.price;
    this.shipping = this.purchaseService.shipping;
  }

  changeProductQuantity(productId: number, quantity: number): void {
    this.purchaseService.changeProductQuantity(productId, quantity);
    this.selectedProducts = this.purchaseService.selectedProducts;
    this.price = this.purchaseService.price;
    this.shipping = this.purchaseService.shipping;
  }

}
