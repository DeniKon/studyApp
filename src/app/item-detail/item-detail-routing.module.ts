import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './item-detail.component';
import { ItemDataResolver } from '../shared/resolvers/item-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: ItemDetailComponent,
    resolve: { item: ItemDataResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemDetailRoutingModule {}
