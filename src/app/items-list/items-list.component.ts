import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import { Item } from '../shared/models/item';
import { ItemsDataService } from '../core/services/items-data.service';
import {map, switchMap} from 'rxjs/operators';
import {ActionType} from '../core/enums/actionType';



@Component({
  selector: 'app-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {
  deletedItemsIds: number;
  deleteSubscription: Subscription;
  items$: Observable<Item[]> = this.dataItemsService.displayedItems$;
  total$: Observable<number> = this.dataItemsService.displayedItems$.
                            pipe(map(items => items.reduce((acc, val) => acc + val.total, 0)));
  deleteItemSubject$ = new Subject<any>();

  displayedColumns: string[] = [
    'itemName',
    'itemDescription',
    'itemPrice',
    'itemCount',
    'itemTotal',
    'itemDeleteLink',
    'itemEditLink',
    'itemDetailLink'
  ];
  constructor(private dataItemsService: ItemsDataService) {
  }
  confirmBeforeDelete(itemId: number): any{
    if (confirm('Are you sure you want to delete this item')){
      this.deleteItemSubject$.next(itemId);
    }
  }

  ngOnInit(): void {
    this.dataItemsService.getItems();
    this.deleteSubscription = this.deleteItemSubject$.
    pipe(
      switchMap(id => this.dataItemsService.deleteItem(id).pipe(
        map(() => id)
      ))).
      subscribe((id) => {
        this.dataItemsService.deletedItem$.next({payload: id, action: ActionType.RemoveItem});
    });
  }
  ngOnDestroy(): void{
    this.deleteSubscription.unsubscribe();
  }
}
