import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class RetrieveProductsService {
  /// TODO: 之後改成後端
  private productUrl = 'assets/products/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl);
  }

  /** 以下的 methods 給單純前端，沒有接上後端使用 */
  
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
  
  /** 以上的 methods 給單純前端，沒有接上後端使用 */

}
