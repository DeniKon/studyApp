import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';
import { Item } from '../../../shared/models/item';
import {AddItem, AddItemFailed, AddItemSuccess, DeleteItem, DeleteItemFailed, DeleteItemSuccess, GetItems, GetItemsFailed, GetItemsSuccess, UpdateItem, UpdateItemFailed, UpdateItemSuccess} from './items.actions';


////////////////////////////////////////////
@Injectable()
@RequestState('getItems')
export class GetItemsRequestState {
}

@RequestState('getItem')
@Injectable()
export class GetItemRequestState {
}

@RequestState('addItem')
@Injectable()
export class AddItemRequestState {
}

@RequestState('updateItem')
@Injectable()
export class UpdateItemRequestState {
}

@RequestState('deleteItem')
@Injectable()
export class DeleteItemRequestState {
}
//////////////////////////////////////////////
export interface ItemsStateModel {
    ids: number[],
    entities: {
        [key:number]: Item
    }
}

@State<ItemsStateModel>({
    name: "items",
    defaults: {
        ids:[],
        entities: {}
    }
})
@Injectable()
export class ItemsState {

    @Action(GetItems) 
    getItems({dispatch}: StateContext<ItemsStateModel>){
        const request = this.httpClient.get('items');
        return dispatch(createRequestAction({
            state: GetItemsRequestState,
            request,
            failAction: GetItemsFailed,
            successAction: GetItemsSuccess,
        })
    )}

    @Action(GetItemsFailed)
    getItemsFailed() {
        console.log('Get Items request error')
    }

    @Action(GetItemsSuccess)
    getItemsSuccess({patchState}:StateContext<ItemsStateModel>, {payload}: GetItemsSuccess ) {
        const ids = payload.map(item => item.id);
        const entities = payload.reduce((entities, item) => {return {...entities, [item['id']]:item}}, {});
        patchState({
            ids,
            entities,
        })
    }

    @Action(AddItem) 
    addItem({dispatch}: StateContext<ItemsStateModel>, {payload}: AddItem){
        const request = this.httpClient.post<Item>('items', payload );
        return dispatch(createRequestAction({
            state: AddItemRequestState,
            request,
            failAction: AddItemFailed,
            successAction: AddItemSuccess,
        })
    )}

    @Action(AddItemFailed)
    addItemsFailed() {
        console.log('Add Items request error');
    }

    @Action(AddItemSuccess)
    addItemsSuccess({setState, getState}:StateContext<ItemsStateModel>, {payload}: AddItemSuccess ) {
        const state = getState();
        setState({
            ids: [...state.ids,payload.id],
            entities: {...state.entities, [payload.id]:payload}
        })
    }

    @Action(DeleteItem)
    deleteItem ({dispatch}: StateContext<ItemsStateModel>, {payload}:DeleteItem) {
        const request = this.httpClient.delete(`items/${payload}`);
        return dispatch(createRequestAction({
            state: DeleteItemRequestState,
            request,
            failAction: DeleteItemFailed,
            successAction: DeleteItemSuccess,
            metadata: payload
        }))
    }

    @Action(DeleteItemSuccess)
    deleteItemSuccess ({patchState, getState}: StateContext<ItemsStateModel>, {metadata}: DeleteItemSuccess){
        const state = getState();
        patchState({
            ids: state.ids.filter(id => id!==metadata)
        })
    }
    @Action(DeleteItemFailed)
    deleteItemsFailed() {
        console.log('Delete Items request error');
    }

    @Action(UpdateItem)
    updateItem ({dispatch}: StateContext<ItemsStateModel>, {payload}:UpdateItem) {
        const request = this.httpClient.put(`items/${payload.id}`, payload);
        return dispatch(createRequestAction({
            state: UpdateItemRequestState,
            request,
            failAction: UpdateItemFailed,
            successAction: UpdateItemSuccess,
            metadata: payload
        }))
    }

    @Action(UpdateItemSuccess)
    updateItemSuccess ({patchState, getState}: StateContext<ItemsStateModel>, {payload, metadata}: UpdateItemSuccess){
        const state = getState();
        const entities = {...state.entities};
        entities[metadata.id] = metadata;
        
        patchState({
            entities: {...entities}
            //updateItem(entity => Object.keys(entity).includes(String(metadata.id)), {[metadata.id]: metadata})
        })
        
    }
    @Action(UpdateItemFailed)
    updateItemsFailed() {
        console.log('Update Items request error');
    }

    constructor(private httpClient: HttpClient) {
    }
}