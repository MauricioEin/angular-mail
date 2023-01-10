import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <section class="app-root">
    <router-outlet></router-outlet>
  </section>
 `, 
})
export class AppComponent {
  title = 'baba';
}
