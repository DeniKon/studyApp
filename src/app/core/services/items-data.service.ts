import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, ReplaySubject } from 'rxjs';
import { Item } from '../../shared/models/item';
import { HttpClient } from '@angular/common/http';
import { map, scan, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ActionType } from '../../shared/models/enums/actionType';
import { Select, Store } from '@ngxs/store';
import { GetItems, GetItem, AddItem, DeleteItem, UpdateItem } from '../store/items/items.actions';
import { ItemsGetterState } from '../store/items/items-getter.state';

@Injectable({
  providedIn: 'root',
})
export class ItemsDataService {
  deletedItem$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  addedItem$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  displayedItems$: Observable<Item[]>;

  @Select(ItemsGetterState.getItems)
  items$: Observable<Item[]>;

  constructor(private http: HttpClient, private store: Store) {
    this.getItems();
  }

  getItems(): void {
    this.store.dispatch(new GetItems());
  }
  getItem(id: number) {
    this.store.dispatch(new GetItem());
  }
  addItem(newItem: Item){
    return this.store.dispatch(new AddItem(newItem));
  }
  deleteItem(itemId: number){
   return this.store.dispatch(new DeleteItem(itemId));
  
  }
  editItem(item:Item) {
    this.store.dispatch(new UpdateItem(item));
  }
  // fetchItems(){
  //   return this.http.get<Item[]>('items');
  // }
  // getItem(id: number): Observable<Item> {
  //   const itemUrl = `items/${id}`;
  //   return this.http.get<Item>(itemUrl);
  // }
  // deleteItem(id: number): Observable<any> {
  //   const itemUrl = `items/${id}`;
  //   return this.http.delete(itemUrl);
  // }
  // addItem(item: Item): Observable<any> {
  //   return this.http.post<any>('items', item);
  // }
  // editItem(item: Item): Observable<any> {
  //   const itemUrl = `items/${item.id}`;
  //   return this.http.put<any>(itemUrl, item);
  // }
}
