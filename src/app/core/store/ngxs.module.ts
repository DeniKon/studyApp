import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { GetItemsRequestState, ItemsState } from './items/items.state';
import { environment } from 'src/environments/environment';
import { NgxsRequestsPluginModule } from 'ngxs-requests-plugin';



@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([
      ItemsState
      ], { developmentMode: !environment.production }
    ),
    NgxsRequestsPluginModule.forRoot([
      GetItemsRequestState,
      ]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'NGXS store',
      disabled: environment.production
    })
  ],
 
})
export class NgXSModule { }
