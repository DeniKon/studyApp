import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ItemsDataService} from './items-data.service';
import {Item} from '../shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemDataResolver implements Resolve<Item> {
  constructor(private itemsDataservise: ItemsDataService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {
    const id = route.paramMap.get('id');
    return this.itemsDataservise.getItem(+id);
  }
}
