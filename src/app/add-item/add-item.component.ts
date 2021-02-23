import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../shared/models/item';
import {ItemsDataService} from '../core/services/items-data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent{
  item: Item;
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    count: new FormControl('', Validators.required),
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
  constructor(
    private dataItemsService: ItemsDataService
  ) { }
  itemInit(): void{
      this.item = this.form.value;
      this.item.total = this.item.count  * this.item.price;
  }
  addItem(item: Item): void{
    this.dataItemsService.addItem(item);
  }
  save(): void{
      this.itemInit();
      this.addItem(this.item);
  }
}
