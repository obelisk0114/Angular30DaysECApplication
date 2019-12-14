import { Component, OnInit } from '@angular/core';

// Constant
import { appPath } from '../../app-path.const';

// Enum
import { SendType } from './send-type.enum';
import { PurchaseService } from '../../product-section/purchase.service';
import { RetrieveProductsService } from '../../product-section/retrieve-products.service';

@Component({
  selector: 'app-receipt-info',
  templateUrl: './receipt-info.component.html',
  styleUrls: ['./receipt-info.component.css']
})
export class ReceiptInfoComponent implements OnInit {

  /**
   * 給 Template 用的路由定義
   *
   * @memberof CustomerInfoComponent
   */
  path = appPath;

  /**
   * 給 Template 用的寄送方式列舉
   *
   * @memberof ReceiptInfoComponent
   */
  sendType = SendType;

  /**
   * 當前的寄送類型，預設使用 Email
   *
   * @memberof ReceiptInfoComponent
   */
  selectedType = SendType.EMAIL;

  constructor(private purchaseService: PurchaseService,
              private retrieveProductsService: RetrieveProductsService) { }

  ngOnInit() {
  }

  /**
   * 切換寄送類型
   *
   * @param {number} type - 欲切換的寄送類型
   * @memberof ReceiptInfoComponent
   */
  switch(type: number): void {
    this.selectedType = type;
  }

  /**
   * 傳入的寄送類型是否為當前所選擇的寄送類型
   *
   * @param {number} type - 欲判斷的寄送類型
   * @returns {boolean}
   * @memberof ReceiptInfoComponent
   */
  didSelected(type: number): boolean {
    return this.selectedType === type;
  }

  /// TODO: 過渡時期
  orderProducts():void {
    for (let [productId, product] of this.purchaseService.selectedProducts) {
      let updatedOne = product;
      updatedOne.quantity = this.purchaseService.available.get(productId) - product.quantity;
      this.retrieveProductsService.updateProduct(updatedOne).subscribe();
    }
  }

}
