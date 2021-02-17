import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditItemComponent } from './edit-item.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ItemDataResolver} from '../shared/resolvers/item-data.resolver';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [EditItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild([
      {path: '', component: EditItemComponent, resolve: {item: ItemDataResolver}},
      ])
  ]
})
export class EditItemModule { }
