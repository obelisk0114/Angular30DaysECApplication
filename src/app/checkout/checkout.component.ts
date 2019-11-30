import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../product-section/purchase.service';
import { IProduct } from '../product-section/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  selectedProducts: IProduct[];
  price: number;
  shipping: number;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    if (this.purchaseService.selectedProducts.length === 0) {
      this.purchaseService.setSelectedProduct();
      this.selectedProducts = this.purchaseService.selectedProducts;
    }

    this.purchaseService.removeZeroProduct();
    this.selectedProducts = this.purchaseService.selectedProducts;

    this.price = this.purchaseService.price;
    this.shipping = this.purchaseService.shipping;
  }

}
