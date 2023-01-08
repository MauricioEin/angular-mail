import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <section class="app-root">
    <router-outlet></router-outlet>

  </section>
            `,
  styles: [':host {height:1200px;}']
})
export class AppComponent {
  title = 'baba';
}
