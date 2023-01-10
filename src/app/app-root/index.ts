import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadEmails } from '../store/actions/email.actions';
import { State } from '../store/store';

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
  constructor(private store: Store<State>) {}
  ngOnInit(){
    this.store.dispatch(new LoadEmails({}));

  }

}
