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

  addCart(): void {
    // 之後看能不能改成有圖的對話窗
    let decision = prompt(`${this.item.name}\nNT$ ${this.item.price}\n庫存: ${this.item.quantity}\n\n購買數量`, "1");
    let quantity: number = +decision;
    if (quantity > 0) {
      if (quantity > this.item.quantity) {
        alert(`庫存不足，目前僅有 ${this.item.quantity}`);
        return;
      }

      if (!this.purchaseService.selectedProducts.has(this.item.id)) {
        let product: IProduct = new ProductEntity(this.item.id, this.item.type, this.item.name, this.item.price, this.item.imageUrl);
        product.quantity = quantity;
        
        this.purchaseService.addProduct(product, this.item.quantity);
      }
      else {
        this.purchaseService.changeProductQuantity(this.item.id, quantity);
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
