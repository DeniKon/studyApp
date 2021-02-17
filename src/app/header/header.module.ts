import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
