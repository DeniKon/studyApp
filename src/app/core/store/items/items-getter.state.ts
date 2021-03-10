import { createSelector, Selector } from "@ngxs/store";
import { ItemsState, ItemsStateModel } from "./items.state";

export class ItemsGetterState {
    @Selector([ItemsState])
    static getItems(state: ItemsStateModel) {
        return state.ids.map(id => state.entities[id]);
    }
    
    static getItemById(id: number){
        return createSelector([ItemsState], (itemState: ItemsStateModel) => itemState.entities[id])
    }
}
