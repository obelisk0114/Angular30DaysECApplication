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

  selectedProducts: IProduct[];
  price: number;
  shipping: number;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.selectedProducts = this.purchaseService.selectedProducts;

    if (this.selectedProducts.length === 0) {
      this.purchaseService.setSelectedProduct();
      this.selectedProducts = this.purchaseService.selectedProducts;
    }
    this.price = this.purchaseService.price;
    this.shipping = this.purchaseService.shipping;
  }

  /**
   * 
   * @param index position in the array
   */
  removeProduct(index: number): void {
    this.purchaseService.removeProduct(index);
    this.selectedProducts = this.purchaseService.selectedProducts;
    this.price = this.purchaseService.price;
    this.shipping = this.purchaseService.shipping;
  }

  changeProductQuantity(index: number, quantity: number): void {
    this.purchaseService.changeProductQuantity(index, quantity);
    this.selectedProducts = this.purchaseService.selectedProducts;
    this.price = this.purchaseService.price;
    this.shipping = this.purchaseService.shipping;
  }

}
