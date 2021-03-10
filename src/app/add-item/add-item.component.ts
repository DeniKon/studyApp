import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemsDataService } from '../core/services/items-data.service';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { negativeNumbertValidator } from '../shared/validators/validators'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit, OnDestroy {
  addItemSubj$ = new Subject<boolean>();
  buttonBackClicked$ = new Subject<boolean>();
  addItemSubscription: Subscription;
  buttonBackSubscription: Subscription;
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, negativeNumbertValidator]),
    count: new FormControl('', [Validators.required, negativeNumbertValidator]),
  });

  get price() {
    return this.form.get('price') as FormControl;
  }
  get count() {
    return this.form.get('count') as FormControl;
  }

  constructor(
    private dataItemsService: ItemsDataService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }
  onSaveClicked(): void {
    this.addItemSubj$.next(true);
  }
  onBackClicked(): void {
    this.buttonBackClicked$.next(true);
  }
  ngOnInit(): void {
    this.buttonBackSubscription = this.buttonBackClicked$.pipe(
      switchMap(() => {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: "You have unsaved data. Leave this page?"});
        return dialogRef.afterClosed();
      })
    ).subscribe((answer) => { 
      if(answer) this.router.navigate(['/']);
    })

    this.addItemSubscription = this.addItemSubj$
      .pipe(
       switchMap(() => 
          this.dataItemsService.addItem(
            {...this.form.value, total: this.form.get('count').value * this.form.get('price').value,}
          )))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
  ngOnDestroy(): void {
    this.addItemSubscription.unsubscribe();
    this.buttonBackSubscription.unsubscribe();
  }
}
