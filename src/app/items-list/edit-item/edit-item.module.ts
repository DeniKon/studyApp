import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditItemComponent } from './edit-item/edit-item.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ItemDataResolver} from '../../core/item-data.resolver';



@NgModule({
  declarations: [EditItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: EditItemComponent, resolve: {item: ItemDataResolver}},
      {path: '/:id', component: EditItemComponent, resolve: {item: ItemDataResolver}}
      ])
  ]
})
export class EditItemModule { }
