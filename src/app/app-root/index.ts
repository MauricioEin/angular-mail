import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
            <app-header></app-header>
            <!-- <section -->
            <router-outlet></router-outlet>
            `,
})
export class AppComponent {
  title = 'Coding Academy NGRX Demo';
}
