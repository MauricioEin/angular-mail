import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable, pluck, take } from 'rxjs';
import { FilterBy } from 'src/app/models/filterBy';
import { LoadEmails, SetFilter } from 'src/app/store/actions/email.actions';
import { State } from 'src/app/store/store';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  filterBy$!: Observable<FilterBy>

  constructor(private store: Store<State>) {
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'))
  }

  setFilter(txt: string) {
    console.log('from header')
    this.filterBy$.pipe(take(1)).subscribe(filterBy=>{
      this.store.dispatch(new LoadEmails({...filterBy, txt }))
    })
  }
  ngOnInit(): void {
  }

}
