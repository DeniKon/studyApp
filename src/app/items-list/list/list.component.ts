import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../shared/models/item';
import {ItemsDataService} from '../../core/items-data.service';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  items$: Observable<Item[]> = this.dataItemsService.items$;
  total$: Observable<number>;
  displayedColumns: string[] = ['itemName', 'itemDescription', 'itemPrice', 'itemCount', 'itemTotal', 'itemDeleteLink', 'itemEditLink', 'itemDetailLink'];

  constructor(private dataItemsService: ItemsDataService) { }

  deleteItem(itemId: number): void {
    this.dataItemsService.deleteItem(itemId).subscribe();
  }
  confirmBeforeDelete(itemId: number): void{
    if (confirm('Are you sure you want to delete this item')){
      this.deleteItem(itemId);
    }
  }

  ngOnInit(): void {
    this.total$ = this.items$.pipe(map(item => item.reduce((acc, val) => acc + val.total, 0)));
  }

}
