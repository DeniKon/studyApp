import { NgModule } from '@angular/core';
import { ItemsListRoutingModule } from './items-list-routing.module';
import { ItemsListComponent } from './items-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ItemsListComponent],
  imports: [
    MatTableModule,
    MatIconModule,
    ItemsListRoutingModule,
    SharedModule,
  ]
})
export class ItemsListModule { }
