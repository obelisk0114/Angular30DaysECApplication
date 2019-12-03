import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSectionComponent } from './product-section.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductSectionComponent,
    children: [
      {
        path: ':type',
        component: ProductListComponent
      },
      {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSectionRoutingModule { }
