import { NgModule } from '@angular/core';
import { EditItemComponent } from './edit-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditItemRoutingModule } from './edit-item-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EditItemComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    EditItemRoutingModule,
    SharedModule,
  ],
})
export class EditItemModule {}
