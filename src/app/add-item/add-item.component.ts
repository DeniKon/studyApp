import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../shared/models/item';
import { ItemsDataService } from '../core/services/items-data.service';
import {Subject, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy{
  addItemSubj$ = new Subject<boolean>();
  subscription: Subscription;
  form: FormGroup = new FormGroup(
    {
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    count: new FormControl('', Validators.required),
  });

  constructor(
    private dataItemsService: ItemsDataService,
    private router: Router
  ) {}
  onSaveClicked(): void{
    this.addItemSubj$.next(true);
  }
  onBackClicked(): void{
    if (confirm('You have unsaved data. Leave this page?')){
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    this.subscription = this.addItemSubj$.pipe(
      switchMap(() =>
        this.dataItemsService.addItem(
          {...this.form.value, total: this.form.get('count').value  * this.form.get('price').value}
          ))
    ).subscribe(() => this.router.navigate(['/']));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
