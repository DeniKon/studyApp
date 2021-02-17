import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ItemsDataService} from '../../core/services/items-data.service';
import {Item} from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemDataResolver implements Resolve<Item> {
  constructor(private itemsDataService: ItemsDataService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {
    const id = route.paramMap.get('id');
    return this.itemsDataService.getItem(+id);
  }
}
