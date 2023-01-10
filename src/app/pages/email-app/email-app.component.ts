import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { State } from '../../store/store';

import { Email } from '../../models/email';
// import { Email } from 'src/app/models/email';
import { LoadEmails,RemoveEmail,LoadEmail } from 'src/app/store/actions/email.actions';
import { FilterBy } from 'src/app/models/filterBy';

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

  filterBy: FilterBy = {};

  constructor(private store: Store<State>) {
    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
    this.email$ = this.store.select('emailState').pipe(pluck('email'));
    this.isLoading$ = this.store.select('emailState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('emailState').pipe(pluck('error'));
  }

  ngOnInit(): void {
    // console.log('emailApp: dispatching LoadEmails => effects');
    this.store.dispatch(new LoadEmails(this.filterBy));
  }
  removeEmail(emailId :string) {
    // console.log('emailApp: dispatching remove');
    this.store.dispatch(new RemoveEmail(emailId));
  }
  editEmail(emailId :string) {
    // console.log('emailApp: dispatching load email (for edit)');
    this.store.dispatch(new LoadEmail(emailId));
  }  
}
