import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pluck } from 'rxjs';
import { Email } from 'src/app/models/email';
import { State } from '../../store/store';


@Component({
  selector: 'email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent {
  emails$: Observable<Email[]>;
  constructor(private store: Store<State>) {
    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
  }


}
