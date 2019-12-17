import { Injectable } from '@angular/core';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  selectedProducts: Map<number, IProduct> = new Map<number, IProduct>();
  available: Map<number, number> = new Map();

  defaultSelected = [
    {
      id: 2,
      type: '',
      name: '草莓蛋糕',
      price: 300,
      imageUrl: 'brenda-godinez-367708-unsplash.jpg',
      quantity: 2
    },
    {
      id: 7,
      type: 'today',
      name: '覆盆子蛋糕',
      price: 150,
      imageUrl: 'food-photographer-jennifer-pallian-650641-unsplash.jpg',
      quantity: 2
    },
    {
      id: 3,
      type: 'today',
      name: '綜合莓塔',
      price: 200,
      imageUrl: 'brooke-lark-96398-unsplash.jpg',
      quantity: 2
    }
  ];

  price = 0;
  shipping = 300;
  
  constructor() { }

  /**
   * 若 selectedProducts 為空，將預設值賦予它
   * 
   * @memberof PurchaseService
   */
  setSelectedProduct(): void {
    if (this.selectedProducts.size === 0) {
      for (let p of this.defaultSelected) {
        this.selectedProducts.set(p.id, p);
        this.price = this.price + p.price * p.quantity; 

        // 僅為測試保留，沒有儲存庫存量
      }

      this.shipping = 300;
    }
  }

  /**
   * 儲存剩餘商品數量
   * 
   * @param {number} productId - 產品 id
   * @param {number | undefined} availability - 產品庫存
   * @memberof PurchaseService
   */
  setAvailable(productId: number, availability: number | undefined): void {
    if (availability) {
      this.available.set(productId, availability);
    }
    else {
      this.available.set(productId, -1);
    }
  }

  /**
   * Remove all products 
   * 
   * @memberof PurchaseService
   */
  cleanSelectedProducts(): void {
    this.selectedProducts.clear();
    this.available.clear();
    
    this.price = 0;
    this.shipping = 0;
  }

  /**
   * 加入產品
   * 
   * @param {IProduct} product - 想加入的產品
   * @param {number | undefined} availability - 產品庫存
   * @memberof PurchaseService
   */
  addProduct(product: IProduct, availability: number | undefined): void {
    this.selectedProducts.set(product.id, product);
    this.setAvailable(product.id, availability);
    
    this.price = this.price + product.price * product.quantity;
    this.shipping = 300;
  }

  /**
   * 移除所選的產品
   * 
   * @param {number} productId - id of the product
   * @memberof PurchaseService
   */
  removeProduct(productId: number): void {
    this.price = this.price - this.selectedProducts.get(productId).price * this.selectedProducts.get(productId).quantity;
    this.selectedProducts.delete(productId);
    this.available.delete(productId);

    if (this.price === 0) {
      this.shipping = 0;
    }
  }

  /**
   * 移除數量為 0 的產品
   * 
   * @memberof PurchaseService
   */
  removeZeroProduct(): void {
    let zeroKey: number[] = [];
    for (let entry of this.selectedProducts.entries()) {
      if (entry[1].quantity == 0) {
        zeroKey.push(entry[0]);
      }
    }

    for (let i of zeroKey) {
      this.selectedProducts.delete(i);
      this.available.delete(i);
    }
  }

  /**
   * 改變產品數量
   * 
   * @param {number} productId - 產品的 id
   * @param {number} quantity - 欲改變的數量
   * @memberof PurchaseService
   */
  changeProductQuantity(productId: number, quantity: number): boolean {
    let updatedQuantity = this.selectedProducts.get(productId).quantity + quantity
    if (updatedQuantity < 0) {
      return false;
    }
    else if (updatedQuantity > this.available.get(productId)) {
      return false;
    }

    this.selectedProducts.get(productId).quantity = updatedQuantity;
    this.price = this.price + this.selectedProducts.get(productId).price * quantity;
    if (this.price === 0) {
      this.shipping = 0;
    }
    else {
      this.shipping = 300;
    }
    return true;
  }
}
