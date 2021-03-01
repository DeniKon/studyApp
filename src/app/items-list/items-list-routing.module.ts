import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListComponent } from './items-list.component';

const routes: Routes = [
  { path: '', component: ItemsListComponent },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('../item-detail/item-detail.module').then(
        (m) => m.ItemDetailModule
      ),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('../add-item/add-item.module').then((m) => m.AddItemModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('../edit-item/edit-item.module').then((m) => m.EditItemModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsListRoutingModule {}
