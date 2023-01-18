import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pluck, Subscription, take } from 'rxjs';
import { Email, selectedEmail } from 'src/app/models/email';
import { State } from '../../store/store';
import { LoadEmails, RemoveEmails, SetFolder, UPDATED_EMAILS, UpdateEmails } from 'src/app/store/actions/email.actions';
import { FilterBy } from 'src/app/models/filterBy';
import { Actions, ofType } from '@ngrx/effects';
import { Label } from 'src/app/models/label';


@Component({
  selector: 'email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent {
  emails$: Observable<Email[]>;
  filterBy$: Observable<FilterBy>;
  totalPages$: Observable<number>;
  labels$: Observable<Label[]>
  folder$: Observable<string>


  selectedEmails: Array<Email> = []
  tab: string = ''
  label: string = ''
  subscription!: Subscription


  constructor(private store: Store<State>,
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute) {

    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'));
    this.totalPages$ = this.store.select('emailState').pipe(pluck('totalPages'));
    this.labels$ = this.store.select('emailState').pipe(pluck('labels'));
    this.folder$ = this.store.select('emailState').pipe(pluck('folder'));
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      let stateFolder
      this.folder$.pipe(take(1)).subscribe(folder => stateFolder = folder)
      this.tab = params['tab'] || ''
      this.label = params['labelName'] || ''

      if (stateFolder === (params['tab'] || params['labelName']))
        this.filterBy$.pipe(take(1)).subscribe(filterBy => {
          this.store.dispatch(new LoadEmails(filterBy))
        })
      else {
        if (params['tab']) {
          this.store.dispatch(new SetFolder(this.tab))
          this.store.dispatch(new LoadEmails({ txt: '', page: 0, tab: this.tab, pageSize: 25 }))
        }
        else if (params['labelName']) {
          this.store.dispatch(new SetFolder(this.label))
          this.loadByLabel()
        }
      }
    })
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

  toggleTab(updated: Email): void {
    this.store.dispatch(new UpdateEmails([updated]))
    this.actions$.pipe(ofType(UPDATED_EMAILS)).subscribe(() => {

      this.filterBy$.pipe(take(1)).subscribe(filterBy => {
        this.store.dispatch(new LoadEmails({ ...filterBy }))
      })
    })
  }

  onRemoveEmails() {
    const emails: Email[] = JSON.parse(JSON.stringify(this.selectedEmails))
    //  when remove from collection
    if (this.tab === 'trash' || this.tab === 'spam') {
      this.store.dispatch(new RemoveEmails(emails))
    }
    // when change all to trash tab
    else {
      emails.forEach(email => {
        let newTabs: string[] = email.tabs!.filter((tab, idx) => {
          return !(tab === 'inbox' || tab === 'sent')
        })
        newTabs.push('trash')
        email.tabs = newTabs
      })

      this.store.dispatch(new UpdateEmails(emails))
      this.actions$.pipe(ofType(UPDATED_EMAILS)).subscribe(() => {

        this.filterBy$.pipe(take(1)).subscribe(filterBy => {
          this.store.dispatch(new LoadEmails({ ...filterBy }))
        })
      })
    }

    this.selectedEmails = []
  }

  setPage(diff: number) {
    this.filterBy$.pipe(take(1)).subscribe(filterBy => {
      const { page } = filterBy
      this.store.dispatch(new LoadEmails({ ...filterBy, page: page! + diff }))
    })
  }

  onSetReadStat() {
    const emails: Email[] = JSON.parse(JSON.stringify(this.selectedEmails))
    // if all were read
    if (emails.some(email => !email.isRead)) {
      emails.forEach(e => e.isRead = true)
    } else {
      emails.forEach(e => e.isRead = false)
    }

    this.store.dispatch(new UpdateEmails(emails))
    this.actions$.pipe(ofType(UPDATED_EMAILS)).subscribe(() => {
      this.selectedEmails = []
    })
  }

  onSetTab(tab: string) {
    const emails: Email[] = JSON.parse(JSON.stringify(this.selectedEmails))
    // when some email is already with the selected tab
    if (emails.some(e => e.tabs?.includes(tab))) {
      emails.forEach(e => {
        const idx: number = e.tabs!.findIndex(t => t === tab)
        if (idx !== -1) e.tabs!.splice(idx, 1)
      })

    } else {
      emails.forEach(e => e.tabs?.push(tab))
    }

    this.store.dispatch(new UpdateEmails(emails))
    this.actions$.pipe(ofType(UPDATED_EMAILS)).subscribe(() => {
      this.selectedEmails = []
    })
  }




  loadByLabel(): void {
    this.labels$.pipe(take(1)).subscribe(labels => {
      const labelId = labels.find(label => label.name === this.label)?._id || ''
      if (labelId)
        this.store.dispatch(new LoadEmails({ txt: '', page: 0, tab: labelId, pageSize: 10 }))
      else
        this.router.navigateByUrl('/email/inbox')
    })
  }

}



