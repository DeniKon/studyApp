import { Component, OnInit } from '@angular/core';
import {Item} from '../../../shared/models/item';
import {ItemsDataService} from '../../../core/items-data.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: Item = {id: 0, name: '', description: '', price: 0, count: 0, total: 0};
  constructor(private dataItemsService: ItemsDataService, private route: ActivatedRoute) { }

  getItem(): Observable<Item> {
    const id = this.route.snapshot.paramMap.get('id');
    return this.dataItemsService.getItem(+id);
  }
  ngOnInit(): void {
    this.getItem().subscribe(item => this.item = item);
  }

}
