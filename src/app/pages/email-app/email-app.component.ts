import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { State } from '../../store/store';
import {LoadItem, LoadItems, RemoveItem} from '../../store/actions/item.actions';
import { Item } from '../../models/item';
import { Email } from 'src/app/models/email';
import { LoadEmails } from 'src/app/store/actions/email.actions';

@Component({
  selector: 'email-app',
  templateUrl: './email-app.component.html',
  styleUrls: ['./email-app.component.scss'],
})
export class EmailAppComponent implements OnInit {
  emails$: Observable<Email[]>;
  email$: Observable<Email | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  addingNew = false;

  filterBy: string = '';

  constructor(private store: Store<State>) {
    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
    this.email$ = this.store.select('emailState').pipe(pluck('email'));
    this.isLoading$ = this.store.select('itemState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('itemState').pipe(pluck('error'));
  }

  ngOnInit(): void {
    console.log('emailApp: dispatching LoadItems => effects');
    this.store.dispatch(new LoadEmails(this.filterBy));
  }
  removeItem(itemId :string) {
    console.log('emailApp: dispatching remove');
    this.store.dispatch(new RemoveItem(itemId));
  }
  editItem(itemId :string) {
    console.log('emailApp: dispatching load item (for edit)');
    this.store.dispatch(new LoadItem(itemId));
  }  
}
