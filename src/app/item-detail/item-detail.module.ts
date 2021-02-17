import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailComponent } from './item-detail.component';
import {RouterModule} from '@angular/router';
import {ItemDataResolver} from '../shared/resolvers/item-data.resolver';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ItemDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      {path: '', component: ItemDetailComponent, resolve: {item: ItemDataResolver}},
    ])
  ],
  exports: [RouterModule]
})
export class ItemDetailModule { }
