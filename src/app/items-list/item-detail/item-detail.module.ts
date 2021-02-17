import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import {Router, RouterModule} from '@angular/router';



@NgModule({
  declarations: [ItemDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ItemDetailComponent},
      {path: '/:id', component: ItemDetailComponent}])
  ],
  exports: [RouterModule]
})
export class ItemDetailModule { }
