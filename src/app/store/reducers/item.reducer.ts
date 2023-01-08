import { SET_LOADING, LOADED_ITEMS, REMOVED_ITEM, ADDED_ITEM, UPDATED_ITEM, LOADED_ITEM, SET_ERROR } from '../actions/item.actions';
import { Item } from 'src/app/models/item';

export interface ItemState {
  items: Item[];
  item: Item | null;
  isLoading: boolean;
  error: string;
}

const initialState: ItemState = {
  items: [],
  item: null,
  isLoading: false,
  error: ''
};

export function reducer(state: ItemState = initialState, action: any): ItemState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      console.log(`Reducer: Setting isLoading to ${isLoading}`);
      return { ...state, isLoading, error: '' };
    }
    case SET_ERROR: {
      const { error } = action;
      console.log(`Reducer: Setting item error`, error);
      return { ...state, error, isLoading: false };
    }
    case LOADED_ITEMS: {
      const { items } = action;
      console.log(`Reducer: Setting loaded items (${items.length}) items`);
      return { ...state, items, isLoading: false, error: '' };
    }
    case LOADED_ITEM: {
      const { item } = action;
      console.log(`Reducer: Setting loaded item ${item.id}`);
      return { ...state, item, error: '' };

    }
    case REMOVED_ITEM: {
      const { itemId } = action;
      console.log('Reducer: Removing item:', itemId);
      const items = state.items.filter(item => item.id !== itemId)
      return { ...state, items, error: '' };

    }
    case ADDED_ITEM: {
      const { item } = action;
      console.log('Reducer: Adding item:', item);
      const items = [...state.items, item]
      return { ...state, items, error: '' };
    }
    case UPDATED_ITEM: {
      const { item } = action;
      console.log('Reducer: Updating item:', item);
      const items = state.items.map(currItem => (currItem.id === item.id) ? item : currItem)
      return { ...state, items, item: null, error: '' };
    }
    default:
      return state;
  }
}
