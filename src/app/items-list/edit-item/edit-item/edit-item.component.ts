import { Component, OnInit } from '@angular/core';
import {Item} from '../../../shared/models/item';
import {ItemsDataService} from '../../../core/items-data.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  item: Item = {id: 0, name: '', description: '', price: 0, count: 0, total: 0};
  formEdit: FormGroup;
  formSubscription: Subscription;

  constructor(private dataItemsService: ItemsDataService, private route: ActivatedRoute) {
    // this.getItem().subscribe(item => this.item = item);
    this.route.data.subscribe(response => this.item = response.item);
    this.formEdit = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      count: new FormControl(),
      total: new FormControl()
    });
    this.formEdit.setValue(this.item);
  }
  ngOnInit(): void {
    this.formSubscription = this.formEdit.valueChanges.subscribe(item => this.item = item);
    console.log(this.item);
  }
  saveChanges(): void {
    this.item.total = this.item.price * this.item.count;
    this.dataItemsService.editItem(this.item);
  }
}
