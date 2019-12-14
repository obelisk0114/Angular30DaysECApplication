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

  addCart(element: IProduct): void {
    // 這裡和 product-item.component.ts 一樣
    let decision = prompt(`${element.name}\nNT$ ${element.price}\n\n購買數量`, "1");
    let quantity: number = +decision;
    if (quantity > 0) {
      if (!this.purchaseService.selectedProducts.has(element.id)) {
        let product: IProduct = new ProductEntity(element.id, element.type, element.name, element.price, element.imageUrl);
        product.quantity = quantity;
    
        this.purchaseService.addProduct(product);
      }
      else {
        this.purchaseService.changeProductQuantity(element.id, quantity);
      }
    }
  }

}
