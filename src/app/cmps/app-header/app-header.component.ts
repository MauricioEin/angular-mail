import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetFilter } from 'src/app/store/actions/email.actions';
import { State } from 'src/app/store/store';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(private store: Store<State>) { }

  setFilter(txt: string) {
    console.log('setFilter:',txt)
    this.store.dispatch(new SetFilter({txt}))
  }
  ngOnInit(): void {
  }

}
