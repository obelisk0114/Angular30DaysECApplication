import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ProductEntity } from '../../product-section/product';
import { PurchaseService } from '../../product-section/purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() item: IProduct;

  constructor(private purchaseService: PurchaseService,
              private router: Router) { }

  ngOnInit() { }

  addCart(element: IProduct): void {
    // 之後看能不能改成有圖的對話窗
    let decision = prompt(`${element.name}\nNT$ ${element.price}\n庫存: ${element.quantity}\n\n購買數量`, "1");
    let quantity: number = +decision;
    if (quantity > 0) {
      let max = Number.MAX_SAFE_INTEGER;
      if (element.quantity) {
        max = element.quantity;
      }

      if (quantity > max) {
        alert(`庫存不足，目前僅有 ${element.quantity}`);
        return;
      }

      if (!this.purchaseService.selectedProducts.has(element.id)) {
        let product: IProduct = new ProductEntity(element.id, element.type, element.name, element.price, element.imageUrl);
        product.quantity = quantity;
        
        this.purchaseService.addProduct(product, element.quantity);
      }
      else {
        this.purchaseService.changeProductQuantity(element.id, quantity);
      }
    }

  }

  goDetails(): void {
    this.router.navigate(['/products/all', this.item.id]);
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
      case "": {
        return "";
      }
      default: {
        return "This is test.";
      }
    }

  }

}
