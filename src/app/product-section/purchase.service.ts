import { Injectable } from '@angular/core';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  selectedProducts: IProduct[] = [];

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
      id: 8,
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

  /// TODO: 之後用 Map 重新架構
  price = 0;
  shipping = 300;
  
  constructor() { }

  /**
   * 若 selectedProducts 為空，將預設值賦予它
   * 
   * @memberof ProductService
   */
  setSelectedProduct(): void {
    if (this.selectedProducts.length === 0) {
      this.selectedProducts = this.defaultSelected;

      for (let p of this.defaultSelected) {
        this.price = this.price + p.price * p.quantity; 
      }
    }
  }

  /**
   * 尋找產品位置
   * 
   * @param {number} productId - id of the product
   * @memberof ProductService
   */
  findProductPosition(productId: number): number {
    let target = this.selectedProducts.findIndex((p: IProduct) => p.id === productId);
    return target;
  }

  /**
   * 加入產品
   * 
   * @param {IProduct} product - 想加入的產品
   * @memberof ProductService
   */
  addProduct(product: IProduct): void {
    this.selectedProducts.push(product);
    
    this.price = this.price + product.price * product.quantity;
    this.shipping = 300;
  }

  /**
   * 移除所選的產品
   * 
   * @param {number} index - position in the array
   * @memberof ProductService
   */
  removeProduct(index: number): void {
    this.price = this.price - this.selectedProducts[index].price * this.selectedProducts[index].quantity;
    this.selectedProducts.splice(index, 1);

    if (this.price === 0) {
      this.shipping = 0;
    }
  }

  /**
   * 移除數量為 0 的產品
   * 
   * @memberof ProductService
   */
  removeZeroProduct(): void {
    this.selectedProducts = this.selectedProducts.filter((product: IProduct) => product.quantity > 0);
  }

  /**
   * 改變產品數量
   * 
   * @param {number} index - 產品在 array 中的位置
   * @param {number} quantity - 欲改變的數量
   * @memberof ProductService
   */
  changeProductQuantity(index: number, quantity: number): void {
    let updatedQuantity = this.selectedProducts[index].quantity + quantity
    if (updatedQuantity < 0) {
      return;
    }
    
    this.selectedProducts[index].quantity = updatedQuantity;
    this.price = this.price + this.selectedProducts[index].price * quantity;
    if (this.price === 0) {
      this.shipping = 0;
    }
    else {
      this.shipping = 300;
    }
  }
}
