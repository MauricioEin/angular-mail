import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetFilter } from 'src/app/store/actions/email.actions';
import { State } from 'src/app/store/store';
import { FilterBy } from 'src/app/models/filterBy';
import { Observable, pluck } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  filterBy$: Observable<FilterBy>;

  constructor(private store: Store<State>) {
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'));
   }


  setFilter(txt: string) {
    console.log('setFilter:',txt)
    this.store.dispatch(new SetFilter(txt))
  }
  ngOnInit(): void {
  }

}
