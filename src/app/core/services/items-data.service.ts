import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {Item} from '../../shared/models/item';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsDataService {
  // tslint:disable-next-line:variable-name
  private _items: Subject<Item[]> = new BehaviorSubject<Item[]>([]);
  public readonly items: Observable<Item[]> = this._items.asObservable();
  constructor(private http: HttpClient) {}

  getItems(): Subscription {
    return this.http.get<Item[]>('items').subscribe(items => this._items.next(items));
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
  addItem(item: Item): any{
    return this.http.post('items', item).subscribe();
  }
  editItem(item: Item): any{
    const itemUrl = `items/${item.id}`;
    return this.http.put(itemUrl, item).subscribe();
  }
}
