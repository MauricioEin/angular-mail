import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as itemModule from './reducers/item.reducer';

import { environment } from '../../environments/environment';

export interface State {
  itemState: itemModule.ItemState;
}

export const reducers: ActionReducerMap<State> = {
  itemState: itemModule.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
