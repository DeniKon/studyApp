import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  item: Item;
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
    if (!this.form.invalid) {
      this.itemInit();
      console.log(this.item);
      this.addItem(this.item);
    }
  }
  ngOnInit(): void {
  }

}
