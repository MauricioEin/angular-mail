import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pluck, lastValueFrom, Subscription } from 'rxjs';
import { Email, selectedEmail } from 'src/app/models/email';
import { State } from '../../store/store';
import { LoadEmails, RemoveEmail, RemoveEmails, SetFilter } from 'src/app/store/actions/email.actions';
import { FilterBy } from 'src/app/models/filterBy';


@Component({
  selector: 'email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent {
  emails$: Observable<Email[]>;
  filterBy$: Observable<FilterBy>;

  selectedEmail!: selectedEmail | null
  selectedEmails: Array<Email> = []
  tab!: string
  subscription!: Subscription


  constructor(private store: Store<State>,
    private route: ActivatedRoute) {
    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'));
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(async params => {
      if (this.tab===params['tab']) return
      this.tab = params['tab']
      this.store.dispatch(new SetFilter({ txt: '', page: 0, tab: this.tab }));
    })
    // this.filterBy$.subscribe(filterBy=>this.store.dispatch(new LoadEmails(filterBy)))

    // this.tab = this.route.snapshot.data['tab']
  }

  toggleCheckbox(payload: selectedEmail): void {
    if (payload.checked) {
      this.selectedEmails.push(payload.email)
    }
    else {
      const idx = this.selectedEmails.findIndex(e => e._id === payload.email._id)
      this.selectedEmails.splice(idx, 1)
    }
  }

  onRemoveEmails() {
    console.log('emailList: dispatching remove');
    this.store.dispatch(new RemoveEmails(this.selectedEmails))
    this.selectedEmails = []
  }

}
