import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ItemsDataService} from './items-data.service';



@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent,
  ]
})
export class CoreModule { }
