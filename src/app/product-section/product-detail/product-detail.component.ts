import { Component, OnInit } from '@angular/core';
import { IProduct, ProductEntity } from '../product';
import { RetrieveProductsService } from '../retrieve-products.service';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;

  constructor(private retrieveProductsService: RetrieveProductsService,
              private purchaseService: PurchaseService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.retrieveProductsService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => console.log(err)
    });
  }

  addCart(): void {
    // 這裡和 product-item.component.ts 一樣
    let decision = prompt(`${this.product.name}\nNT$ ${this.product.price}\n庫存: ${this.product.quantity}\n\n購買數量`, "1");
    let quantity: number = +decision;
    if (quantity > 0) {
      if (quantity > this.product.quantity) {
        alert(`庫存不足，目前僅有 ${this.product.quantity}`);
        return;
      }

      if (!this.purchaseService.selectedProducts.has(this.product.id)) {
        let product: IProduct = new ProductEntity(this.product.id, this.product.type, this.product.name, this.product.price, this.product.imageUrl);
        product.quantity = quantity;
        
        this.purchaseService.addProduct(product, this.product.quantity);
      }
      else {
        this.purchaseService.changeProductQuantity(this.product.id, quantity);
      }
    }
  }

}
