import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { State } from '../../store/store';
import {LoadItem, LoadItems, RemoveItem} from '../../store/actions/item.actions';
import { Item } from '../../models/item';

@Component({
  selector: 'item-app',
  templateUrl: './item-app.component.html',
  styleUrls: ['./item-app.component.scss'],
})
export class ItemAppComponent implements OnInit {
  items$: Observable<Item[]>;
  item$: Observable<Item | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  addingNew = false;

  filterBy: string = '';

  constructor(private store: Store<State>) {
    this.items$ = this.store.select('itemState').pipe(pluck('items'));
    this.item$ = this.store.select('itemState').pipe(pluck('item'));
    this.isLoading$ = this.store.select('itemState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('itemState').pipe(pluck('error'));
  }

  ngOnInit(): void {
    console.log('itemApp: dispatching LoadItems => effects');
    this.store.dispatch(new LoadItems(this.filterBy));
  }
  removeItem(itemId :string) {
    console.log('itemApp: dispatching remove');
    this.store.dispatch(new RemoveItem(itemId));
  }
  editItem(itemId :string) {
    console.log('itemApp: dispatching load item (for edit)');
    this.store.dispatch(new LoadItem(itemId));
  }  
}
