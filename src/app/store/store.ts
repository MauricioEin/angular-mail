import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as emailModule from './reducers/email.reducer';

import { environment } from '../../environments/environment';

export interface State {
 
  emailState: emailModule.EmailState;
}

export const reducers: ActionReducerMap<State> = {
  
  emailState: emailModule.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
