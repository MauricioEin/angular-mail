import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, pluck, tap, from } from 'rxjs';
import { FilterBy } from '../models/filterBy';
import { LoadEmails, LoadLabels } from '../store/actions/email.actions';
import { State } from '../store/store';
import { of, pipe } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template: `
  <section class="app-root">
    <div class="container">
    <router-outlet></router-outlet>
    </div>
  </section>
 `,
})
export class AppComponent {

  title = 'Angular Email'
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new LoadLabels())
  }


}
