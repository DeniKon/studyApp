import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListRoutingModule } from './items-list-routing.module';
import { ItemsListComponent } from './items-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ItemsListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ItemsListRoutingModule,
  ]
})
export class ItemsListModule { }
