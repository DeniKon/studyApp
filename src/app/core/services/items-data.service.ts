import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../shared/models/item';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsDataService {
  items$: Observable<Item[]>;
  constructor(private http: HttpClient) {
    this.items$ = this.getItems();
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('items');
  }
  getItem(id: number): Observable<Item> {
    const itemUrl = `items/${id}`;
    return this.http.get<Item>(itemUrl);
  }
  deleteItem(id: number): any {
    const itemUrl = `items/${id}`;
    return this.http.delete(itemUrl);
  }
  addItem(item: Item): any{
    return this.http.post('items', item);
  }
  editItem(item: Item): any{
    const itemUrl = `items/${item.id}`;
    return this.http.put(itemUrl, item).subscribe();
  }
}
