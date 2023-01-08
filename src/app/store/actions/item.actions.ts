import { Action } from '@ngrx/store';
import { Item } from 'src/app/models/item';

export const SET_LOADING = '[item] loading';
export const SET_ERROR = '[item] error';
export const LOAD_ITEMS = '[item]s load';
export const LOAD_ITEM = '[item] load';
export const LOADED_ITEM = '[item] loaded';
export const LOADED_ITEMS = '[item]s loaded';
export const REMOVE_ITEM = '[item] remove';
export const REMOVED_ITEM = '[item] removed';
export const SAVE_ITEM = '[item] saved';
export const ADDED_ITEM = '[item] added';
export const UPDATED_ITEM = '[item] updated';

export type ItemAction = LoadItems | LoadItem | RemoveItem | SaveItem

export class LoadItems implements Action {
  readonly type = LOAD_ITEMS;
  constructor(public filterBy: string = '') {}
}
export class LoadItem implements Action {
  readonly type = LOAD_ITEM;
  constructor(public itemId: string = '') {}
}
export class RemoveItem implements Action {
  readonly type = REMOVE_ITEM;
  constructor(public itemId: string) {}
}
export class LoadedItems implements Action {
  readonly type = LOADED_ITEMS;
  constructor(public items: Item[] = []) {}
}
export class LoadedItem implements Action {
  readonly type = LOADED_ITEM;
  constructor(public item: Item) {}
}
export class RemovedItem implements Action {
  readonly type = REMOVED_ITEM;
  constructor(public itemId: string) {}
}
export class SaveItem implements Action {
  readonly type = SAVE_ITEM;
  constructor(public item: Item) {}
}
export class AddedItem implements Action {
  readonly type = ADDED_ITEM;
  constructor(public item: Item) {}
}
export class UpdatedItem implements Action {
  readonly type = UPDATED_ITEM;
  constructor(public item: Item) {}
}
export class LoadingItems implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) {}
}
export class ItemError implements Action {
  readonly type = SET_ERROR;
  constructor(public error: string) {}
}

