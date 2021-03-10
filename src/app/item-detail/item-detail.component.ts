import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/item';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ItemsGetterState } from '../core/store/items/items-getter.state';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
  itemDetail$: Observable<Item>;
  itemId: number;
  constructor(private route: ActivatedRoute, private store:Store) {
    
  }
  ngOnInit(): void {
    this.itemDetail$ = this.route.paramMap.pipe(
      switchMap((params) => this.store.select(ItemsGetterState.getItemById(+params.get('id'))))
      )
    
  }
}
