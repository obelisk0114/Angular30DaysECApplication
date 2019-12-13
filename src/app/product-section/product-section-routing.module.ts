import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSectionComponent } from './product-section.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductSectionComponent,
    children: [
      {
        path: 'all/:id',
        component: ProductDetailComponent
      },
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
