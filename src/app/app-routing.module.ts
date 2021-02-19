import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'items', pathMatch: 'full'},
  {path: 'items', loadChildren: () => import('./items-list/items-list.module').then(m => m.ItemsListModule)},
  {path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
