import { Component } from '@angular/core';
import {Item} from '../shared/models/item';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent {
  item: Item = {id: 0, name: '', description: '', price: 0, count: 0, total: 0};
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe(response => this.item = response.item);
  }
}
