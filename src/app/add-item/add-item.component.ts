import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Item} from '../shared/models/item';
import {ItemDetailComponent} from '../item-detail/item-detail.component';
import {ItemsDataService} from '../core/services/items-data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    count: new FormControl(),
  });
  get name(): FormControl{
    return this.form.get('name') as FormControl;
  }
  get description(): FormControl{
    return this.form.get('description') as FormControl;
  }
  get price(): FormControl{
    return this.form.get('price') as FormControl;
  }
  get count(): FormControl{
    return this.form.get('count') as FormControl;
  }

  item: Item;
  constructor(
    private dataItemsService: ItemsDataService
  ) { }

  itemInit(): void{
    this.item = this.form.value;
    this.item.total = this.item.count  * this.item.price;
  }
  addItem(item: Item): void{
    this.dataItemsService.addItem(item).subscribe();
  }

  save(): void{
    this.itemInit();
    this.addItem(this.item);
  }
  ngOnInit(): void {
  }

}
