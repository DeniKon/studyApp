import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../shared/models/item';
import { ItemsDataService } from '../core/services/items-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import  { isEqual } from '../shared/utils/isEqual';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit, OnDestroy {
  saveEditSubject$ = new Subject<boolean>();
  resetEditSubject$ = new Subject<boolean>();
  item$: Observable<Item>;
  isButtonSaveEnabled$: Observable<boolean>;
  formEdit: FormGroup;
  itemEditSubscription: Subscription;
  itemsSubscription: Subscription;
  formResetSubscription: Subscription;

  constructor(
    private dataItemsService: ItemsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  get price(): FormControl {
    return this.formEdit.get('price') as FormControl;
  }
  get count(): FormControl {
    return this.formEdit.get('count') as FormControl;
  }

  ngOnInit(): void {
    this.item$ = this.route.data.pipe(map((data) => data.item));
    this.itemsSubscription = this.item$.subscribe(
      (item) =>
        (this.formEdit = new FormGroup({
          id: new FormControl(item.id, Validators.required),
          name: new FormControl(item.name, Validators.required),
          description: new FormControl(item.description, Validators.required),
          price: new FormControl(item.price, Validators.required),
          count: new FormControl(item.count, Validators.required),
          total: new FormControl(item.price * item.count),
        }))
    );
    this.itemEditSubscription = this.saveEditSubject$
      .pipe(
        switchMap(() =>
          this.dataItemsService.editItem({
            ...this.formEdit.value,
            total: this.price.value * this.count.value,
          })
        )
      )
      .subscribe(() => this.router.navigate(['/']));

    this.formResetSubscription = combineLatest([
      this.item$,
      this.resetEditSubject$,
    ])
      .pipe(map(([item]) => this.formEdit.reset(item)))
      .subscribe();

    this.isButtonSaveEnabled$ = combineLatest([
      this.item$,
      this.formEdit.valueChanges,
    ]).pipe(map(([item, editedItem]) => !isEqual(item, editedItem)));
  }
  saveChanges(): void {
    this.saveEditSubject$.next(true);
  }
  resetChanges(): void {
    this.resetEditSubject$.next(true);
  }
  
  ngOnDestroy(): void {
    this.itemEditSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
    this.formResetSubscription.unsubscribe();
  }
}
