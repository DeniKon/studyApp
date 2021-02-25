import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable, ReplaySubject,
  Subject,
  Subscription
} from 'rxjs';
import { Item } from '../../shared/models/item';
import { HttpClient } from '@angular/common/http';
import {shareReplay, switchMap, switchMapTo, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemsDataService {
  items$: Observable<Item[]>;
  replaySubject = new ReplaySubject<number>();

  constructor(private http: HttpClient) {
    this.items$ = this.replaySubject
      .pipe(
        switchMap((params) => {
          return this.http.get<Item[]>('items');
        }),
        shareReplay(),
      );
  }

  getItems(params?: number): void {
    this.replaySubject.next(params);
    // return this.http.get<Item[]>('items').subscribe(items => this._items.next(items));
  }
  getItem(id: number): Observable<Item> {
    const itemUrl = `items/${id}`;
    return this.http.get<Item>(itemUrl);
  }
  deleteItem(id: number): any {
    const itemUrl = `items/${id}`;
    this.http.delete(itemUrl).subscribe();
    this.getItems();
  }
  addItem(item: Item): Observable<any>{
    return this.http.post<any>('items', item);
  }
  editItem(item: Item): Observable<any>{
    const itemUrl = `items/${item.id}`;
    return this.http.put<any>(itemUrl, item);
  }
}
