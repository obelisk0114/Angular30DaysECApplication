import { Component, OnInit } from '@angular/core';

// Constant
import { appPath } from '../../app-path.const';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css']
})
export class PaymentInfoComponent implements OnInit {

  /**
   * 給 Template 用的路由定義
   *
   * @memberof CustomerInfoComponent
   */
  path = appPath;

  constructor() { }

  ngOnInit() {
  }

}
