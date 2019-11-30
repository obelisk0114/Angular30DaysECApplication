import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ProductEntity } from '../../product-section/product';
import { PurchaseService } from '../../product-section/purchase.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() item: IProduct;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
  }

  addCart(element: IProduct): void {
    // 之後看能不能改成有圖的對話窗
    let decision = prompt(`${element.name}\nNT$ ${element.price}\n\n購買數量`, "1");
    let quantity: number = +decision;
    if (quantity > 0) {

      let idx: number = this.purchaseService.findProductPosition(element.id);
      if (idx === -1) {
        let product: IProduct = new ProductEntity(element.id, element.type, element.name, element.price, element.imageUrl);
        product.quantity = quantity;
    
        this.purchaseService.addProduct(product);
      }
      else {
        this.purchaseService.changeProductQuantity(idx, quantity);
      }
    }

  }

  showType(type: string): string {
    
    switch (type) {
      case "today": {
        return "本日精選";
      }
      case "popular": {
        return "人氣推薦";
      }
      case "new": {
        return "新品上市";
      }
      default: {
        return "";
      }
    }

  }

}
