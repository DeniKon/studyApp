import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/item';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
  itemDetail$: Observable<Item>;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.itemDetail$ = this.route.data.pipe(map((data) => data.item));
  }
}
