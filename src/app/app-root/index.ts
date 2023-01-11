import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, pluck, tap, from } from 'rxjs';
import { FilterBy } from '../models/filterBy';
import { LoadEmails } from '../store/actions/email.actions';
import { State } from '../store/store';
import { of, pipe } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template: `
  <section class="app-root">
    <router-outlet></router-outlet>
  </section>
 `,
})
export class AppComponent {
  title = 'Angular Email'

}
