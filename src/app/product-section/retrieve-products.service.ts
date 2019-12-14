import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class RetrieveProductsService {
  // 只有前端使用的 url
  //private productUrl = 'assets/products/products.json';

  // 接上後端使用的 url
  private productUrl = 'http://localhost:8080/product';

  constructor(private http: HttpClient) { }
  
  /** 以下的 methods 給接上後端使用 */
  
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl + '/all');
  }

  getProductsByType(type: string): Observable<IProduct[] | undefined> {
    return this.http.get<IProduct[]>(this.productUrl + `/${type}`);
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.http.get<IProduct>(this.productUrl + `?id=${id}`);
  }

  /** PUT: update the product on the server */
  updateProduct(product: IProduct): Observable<IProduct> {
    let subUrl = '/' + product.id;
    return this.http.put<IProduct>(this.productUrl + subUrl, product).pipe(
      tap(_ => console.log(`updated product id = ${product.id}; name: ${product.name}; 
      type: ${product.type}; quantity: ${product.quantity}; price: ${product.price}`)));
  }
  
  /** 以上的 methods 給接上後端使用 */
  
  /**   ============================   我是分隔線   ================================   */
  
  /** 以下的 methods 給單純前端使用 */
  /*
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl);
  }

  getProductsByType(type: string): Observable<IProduct[] | undefined> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      map((products: IProduct[]) => products.filter(p => p.type === type))
    );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      map((products: IProduct[]) => products.find(p => p.id === id))
    );
  }
  */
  /** 以上的 methods 給單純前端使用 */

}
