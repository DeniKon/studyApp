import { NgModule } from '@angular/core';
import { AddItemComponent } from './add-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddItemRoutingModule } from './add-item-routing.module';
import { SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [AddItemComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    AddItemRoutingModule,
    SharedModule,
  ]
})
export class AddItemModule { }
