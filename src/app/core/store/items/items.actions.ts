import { HttpErrorResponse } from '@angular/common/http';
import {Item} from '../../../shared/models/item';

export const itemActions = {
    GET_ITEMS : '[Items] get items',
    GET_ITEMS_SUCCESS : '[Items] get items success',
    GET_ITEMS_FAILED : '[Items] get items failed',

    GET_ITEM: '[Items] get item',
    GET_ITEM_SUCCESS: '[Items] get item success',
    GET_ITEM_FAILED: '[Items] get item failed',

    ADD_ITEM : '[Items] add item',
    ADD_ITEM_SUCCESS : '[Items] add item success',
    ADD_ITEM_FAILED : '[Items] add item failed',

    UPDATE_ITEM : '[Items] update item',
    UPDATE_ITEM_SUCCESS : '[Items] update item success',
    UPDATE_ITEM_FAILED : '[Items] update item failed',

    DELETE_ITEM : '[Items] delete item',
    DELETE_ITEM_SUCCESS : '[Items] delete item success',
    DELETE_ITEM_FAILED : '[Items] delete item failed',
}

export class GetItems {
    static type = itemActions.GET_ITEMS;
}
export class GetItemsSuccess {
    static type = itemActions.GET_ITEMS_SUCCESS;
    constructor(public payload: Item[]) {
    }
}
export class GetItemsFailed {
    static type = itemActions.GET_ITEMS_FAILED;
    constructor(public payload: HttpErrorResponse) {
    }
}
export class GetItem {
    static type = itemActions.GET_ITEM;
}
export class GetItemSuccess {
    static type = itemActions.GET_ITEM_SUCCESS;
    constructor(public payload: Item) {
    }
}
export class GetItemFailed {
    static type = itemActions.GET_ITEM_FAILED;
    constructor(public payload: HttpErrorResponse) {
    }
}
export class AddItem {
    static type = itemActions.ADD_ITEM;
    constructor(public payload: Item){

    }
}
export class AddItemSuccess {
    static type = itemActions.ADD_ITEM_SUCCESS;
    constructor(public payload: Item){
    }
}
export class AddItemFailed {
    static type = itemActions.ADD_ITEM_FAILED;
    constructor(public payload: HttpErrorResponse) {
    }
}
export class UpdateItem {
    static type = itemActions.UPDATE_ITEM;
    constructor(public payload: Item){}
}
export class UpdateItemSuccess {
    static type = itemActions.UPDATE_ITEM_SUCCESS;
    constructor(public payload: Item, public metadata: Item){}
}
export class UpdateItemFailed {
    static type = itemActions.UPDATE_ITEM_FAILED;
}
export class DeleteItem {
    static type = itemActions.DELETE_ITEM;
    constructor(public payload: number){
    }
}
export class DeleteItemSuccess {
    static type = itemActions.DELETE_ITEM_SUCCESS;
    constructor(public payload:number, public metadata:number){
    }
}
export class DeleteItemFailed {
    static type = itemActions.DELETE_ITEM_FAILED;
}