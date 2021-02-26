import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable, ReplaySubject} from 'rxjs';
import {Item} from '../../shared/models/item';
import {HttpClient} from '@angular/common/http';
import {map, scan, shareReplay, switchMap} from 'rxjs/operators';
import {ActionType} from '../enums/actionType';



@Injectable({
  providedIn: 'root'
})
export class ItemsDataService {
  deletedItem$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  displayedItems$: Observable<Item[]>;
  items$: Observable<any>;
  replaySubject = new ReplaySubject<number>();

  constructor(private http: HttpClient) {
    this.items$ = this.replaySubject
      .pipe(
        switchMap((params) => {
          return this.http.get<Item[]>('items');
        }),
        map((items) => ({payload: items, action: ActionType.SetItems})),
        shareReplay(),
      );

    // this.displayedItems$ = combineLatest([
    //   this.items$,
    //   this.deletedItem$,
    // ]).pipe(
    //   map(([items, deletedItemsIds]) =>
    //     items.filter((item) => !deletedItemsIds.includes(item.id))),
    // );
    this.displayedItems$ = merge(
        this.items$,
        this.deletedItem$,
    ).pipe(
      scan((acc: Item[], emit: {payload: any, action: ActionType}) => {
          switch (emit?.action)
          {
            case ActionType.RemoveItem: {
              return acc.filter((item) => item.id !== emit.payload);
            }
            case ActionType.SetItems: {
              return emit.payload;
            }
            default: {
              return [];
            }
          }
      }, [])
    );
  }

  getItems(params?: number): void {
    this.replaySubject.next(params);
  }
  getItem(id: number): Observable<Item> {
    const itemUrl = `items/${id}`;
    return this.http.get<Item>(itemUrl);
  }
  deleteItem(id: number): Observable<any> {
    const itemUrl = `items/${id}`;
    return this.http.delete(itemUrl);

  }
  addItem(item: Item): Observable<any>{
    return this.http.post<any>('items', item);
  }
  editItem(item: Item): Observable<any>{
    const itemUrl = `items/${item.id}`;
    return this.http.put<any>(itemUrl, item);
  }
}
