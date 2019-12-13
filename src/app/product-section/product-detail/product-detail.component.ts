import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { RetrieveProductsService } from '../retrieve-products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;

  constructor(private retrieveProductsService: RetrieveProductsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.retrieveProductsService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => console.log(err)
    });
  }

}
