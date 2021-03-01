import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDataResolver } from '../shared/resolvers/item-data.resolver';
import { EditItemComponent } from './edit-item.component';

const routes: Routes = [
  {
    path: '',
    component: EditItemComponent,
    resolve: { item: ItemDataResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditItemRoutingModule {}
