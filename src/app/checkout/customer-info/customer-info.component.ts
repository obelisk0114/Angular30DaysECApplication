import { Component, OnInit } from '@angular/core';

// Constant
import { appPath } from '../../app-path.const';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

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
