import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../shared/models/item';
import { ItemsDataService } from '../core/services/items-data.service';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {
  items$: Observable<Item[]> = this.dataItemsService.items;
  total$: Observable<number> = this.dataItemsService.items.
                            pipe(map(items => items.reduce((acc, val) => acc + val.total, 0)));

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

 // subject hot cold stream

  constructor(
    private dataItemsService: ItemsDataService
  ) {}

  deleteItem(itemId: number): Observable<object> {
    return this.dataItemsService.deleteItem(itemId);
  }
  confirmBeforeDelete(itemId: number): any{
    if (confirm('Are you sure you want to delete this item')){
      this.deleteItem(itemId);
    }
  }

  ngOnInit(): void {
    this.dataItemsService.getItems();
    // this.itemsSubject.subscribe(items => this.items = items);
    // this.itemsSubject.subscribe(items => this.total = items.reduce((acc, val) => acc + val.total, 0));
    // this.subscription = this.dataItemsService.getItems().subscribe(this.itemsSubject);
    // this.total$ = this.items$.pipe(map(items => items.reduce((acc, val) => acc + val.total, 0)));
    // this.itemsSubject.subscribe(items => this.items = items);
    // this.itemsSubject.subscribe(items => this.total = items.pipe(map(itemsList => itemsList.reduce((acc, val) => acc + val.total, 0))));
    // this.itemsSubject.next(this.dataItemsService.getItems());
  }
  ngOnDestroy(): void{
    // this.subscription.unsubscribe();
  }

}
