import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product';
import { RetrieveProductsService } from '../retrieve-products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { productType } from '../product-type.const';
import { startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productType = productType;

  /**
   * Will get certain type of products from backend
   */
  productLists: IProduct[] = [];

  /**
   * products in this page
   */
  filteredProduct: IProduct[] = [];

  productPerPage = 6;    // max quantity of products per page
  currentPage = 1;
  pagination: (string | number)[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private retrieveProductsService: RetrieveProductsService) { }

  ngOnInit() {
    let routePath = this.route.params;
    let routeQuery = this.route.queryParamMap;

    let routeQueryStart = routeQuery.pipe(startWith());

    combineLatest(routePath, routeQueryStart).subscribe(latestValues => {
      const [routeParams, routeQueryParamMap] = latestValues;

      const queryPage = routeQueryParamMap.get('page');
      const type = routeParams.type;

      if (queryPage) {
        if (+queryPage) {
          this.currentPage = +queryPage;

          if (this.currentPage < 1) {
            this.router.navigate(['.'], {
              relativeTo: this.route
            });
            return;
          }
        }
        else {
          this.router.navigate(['.'], {
            relativeTo: this.route
          });
          return;
        }
      }
      else {
        this.currentPage = 1;
      }

      if (type === this.productType.all) {
        this.retrieveProductsService.getProducts().subscribe((productLists) => {
          this.setProductListPage(productLists);
        });
      }
      else {
        this.retrieveProductsService.getProductsByType(type).subscribe({
          next: productLists => this.setProductListPage(productLists)
        });
      }
    });
  }

  /**
   * Set productLists
   * 
   * @param {IProduct[]} productLists - used to set productLists property
   * @memberof ProductListComponent 
   */
  setProductListPage(productLists: IProduct[]): void {
    this.productLists = productLists;
    this.setFilteredProduct();

    if (this.productLists.length !== 0) {
      this.setPagination();
    }
  }

  /**
   * Set filteredProduct (products in this page)
   * 
   * @memberof ProductListComponent
   */
  setFilteredProduct(): void {
    this.filteredProduct.splice(0, this.filteredProduct.length);

    let start = (this.currentPage - 1) * this.productPerPage;
    let end = Math.min(this.currentPage * this.productPerPage, this.productLists.length);
    for (let i = start; i < end; i++) {
      this.filteredProduct.push(this.productLists[i]);
    }
  }

  /**
   * Set pagination
   * 
   * ex: lastPage = 10
   * current page = 1 => 1, 2, 3, ..., 10
   * current page = 2 => 1, 2, 3, ..., 10
   * current page = 3 => 1, 2, 3, 4, ..., 10
   * current page = 8 => 1, ..., 7, 8, 9, 10
   * current page = 9 => 1, ..., 8, 9, 10
   * current page = 10 => 1, ..., 8, 9, 10
   * 
   * current page = 5 => 1, ..., 4, 5, 6, ..., 10
   * 
   * @memberof ProductListComponent
   */
  setPagination(): void {
    this.pagination.splice(0, this.pagination.length);
    let lastPage = Math.ceil(this.productLists.length / this.productPerPage);

    if (lastPage <= 7) {
      for (let i = 0; i < lastPage; i++) {
        this.pagination.push(i + 1);
      }
    }
    else if (this.currentPage > lastPage) {
      this.pagination.push(1);
      this.pagination.push('...');
      this.pagination.push(lastPage - 4);
      this.pagination.push(lastPage - 3);
      this.pagination.push(lastPage - 2);
      this.pagination.push(lastPage - 1);
      this.pagination.push(lastPage);
    }
    else {
      this.pagination.push(1);

      switch (this.currentPage) {
        case 1:   // fall through
        case 2:
        case 3:
        case 4:
          this.pagination.push(2);
          this.pagination.push(3);
          this.pagination.push(4);
          this.pagination.push(5);
          this.pagination.push('...');
          break;
        case (lastPage - 3):   // fall through
        case (lastPage - 2):
        case (lastPage - 1):
        case lastPage:
          this.pagination.push('...');
          this.pagination.push(lastPage - 4);
          this.pagination.push(lastPage - 3);
          this.pagination.push(lastPage - 2);
          this.pagination.push(lastPage - 1);
          break;
        default:
          this.pagination.push('...');
          this.pagination.push(this.currentPage - 1);
          this.pagination.push(this.currentPage);
          this.pagination.push(this.currentPage + 1);
          this.pagination.push('...');
      }

      this.pagination.push(lastPage);
    }
  }

  /**
   * Change page and set products in this page
   * 
   * @param {HTMLElement} pageRef - page element
   * @memberof ProductListComponent
   */
  changePage(pageRef: HTMLElement): void {
    let content = pageRef.textContent;

    // console.log("textContent = '" + pageRef.textContent + "'");   # 印出 textContent = '... '
    // console.log("innerText = '" + pageRef.innerText + "'");       # 印出 innerText = '...'

    if (content === 'arrow_left') {
      if (!this.isBoundary('left')) {
        this.currentPage--;
      }
      else {
        return;
      }
    }
    else if (content === 'arrow_right') {
      if (!this.isBoundary('right')) {
        this.currentPage++;
      }
      else {
        return;
      }
    }
    else if (content === '... ') {
      return;
    }
    else {
      this.currentPage = +content;
    }

    this.router.navigate(['.'], {
      queryParams: {
        page: this.currentPage
      },
      relativeTo: this.route
    });
  }

  /**
   * Check the page is current page or not
   * 
   * @param {number} page - page in DOM
   * @memberof ProductListComponent
   */
  isCurrentPage(page: number): boolean {
    return page === this.currentPage;
  }

  isBoundary(arrow: string): boolean {
    if (arrow === 'left') {
      return this.currentPage <= 1;
    }
    else {
      return this.currentPage >= Math.ceil(this.productLists.length / this.productPerPage);
    }
  }

}
