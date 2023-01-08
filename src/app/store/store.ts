import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as itemModule from './reducers/item.reducer';
import * as emailModule from './reducers/email.reducer';

import { environment } from '../../environments/environment';

export interface State {
  itemState: itemModule.ItemState;
  emailState: emailModule.EmailState;
}

export const reducers: ActionReducerMap<State> = {
  itemState: itemModule.reducer,
  emailState: emailModule.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
