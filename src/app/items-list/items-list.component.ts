import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { Item } from '../shared/models/item';
import { ItemsDataService } from '../core/services/items-data.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit, OnDestroy {
  deletedItemsIds: number;
  deleteSubscription: Subscription;
  items$: Observable<Item[]> = this.dataItemsService.items$;
  total$: Observable<number> = this.dataItemsService.items$.
    pipe(map(items => items.reduce((acc, val) => acc + val.total, 0)));

  deleteItemSubject$ = new Subject<number>();
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  displayedColumns: string[] = [
    'itemName',
    'itemDescription',
    'itemPrice',
    'itemCount',
    'itemTotal',
    'itemDeleteLink',
    'itemEditLink',
    'itemDetailLink',
  ];
  constructor(
    private dataItemsService: ItemsDataService,
    public dialog: MatDialog) {
  }
  confirmBeforeDelete(itemId: number): any {
    this.deleteItemSubject$.next(itemId);
      //  this.dialogRef =  this.dialog.open(ConfirmDialogComponent, {data: itemId});
      //  return this.dialogRef.afterClosed();
    // if (confirm('Are you sure you want to delete this item')) {
    //   this.deleteItemSubject$.next(itemId);
    //}
  }

  ngOnInit(): void {
    this.deleteSubscription = this.deleteItemSubject$.pipe(
      switchMap((itemId) => {
       const dialogRef =  this.dialog.open(ConfirmDialogComponent, {data: "Delete this item?"});
       return dialogRef.afterClosed().pipe(
        filter((res) => !!res),
        map(() => itemId)
       );
      }),
      switchMap((itemId) => this.dataItemsService.deleteItem(itemId))
      )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.deleteSubscription.unsubscribe();
  }
}
