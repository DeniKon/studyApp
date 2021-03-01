import { NgModule } from '@angular/core';
import { ItemDetailComponent } from './item-detail.component';
import { MatCardModule } from '@angular/material/card';
import { ItemDetailRoutingModule } from './item-detail-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ItemDetailComponent],
  imports: [
    MatCardModule,
    ItemDetailRoutingModule,
    SharedModule,
  ],
})
export class ItemDetailModule { }
