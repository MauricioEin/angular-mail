import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, pluck, Subscription, take } from 'rxjs'
import { Email } from 'src/app/models/email'
import { FilterBy } from 'src/app/models/filterBy'
import { ADDED_EMAIL, LOADED_EMAIL, LoadEmail, LoadEmails, SaveEmail, UPDATED_EMAIL } from 'src/app/store/actions/email.actions'
import { State } from 'src/app/store/store'

@Component({
  selector: 'email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.scss']
})
export class EmailComposeComponent {

  constructor(private store: Store<State>,
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.email$ = this.store.select('emailState').pipe(pluck('email'))
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'))
  }

  email: Email = { to: '', subject: '', body: '' }
  subscription: Subscription | null = null;
  email$: Observable<Email | null>
  filterBy$: Observable<FilterBy>
  composeForm!: FormGroup
  isMini = false
  isFull = false
  title = 'New Message'
  draftInterval: number | null = null

  ngOnInit() {
    this.buildForm()
    this.route.queryParams.subscribe(({ compose }) => {
      if (this.email._id !== compose) {
        if (compose === 'new') {
          this.email = { to: '', subject: '', body: '' }
          this.title = 'New Message'
          this.buildForm()
        }
        else this.store.dispatch(new LoadEmail(compose))
      }
    })
    this.actions$.pipe(ofType(LOADED_EMAIL)).subscribe(({ email }: any) => {
      this.email = JSON.parse(JSON.stringify(email))
      this.title = email.subject || 'New Message'
      this.buildForm()
    })
  }

  buildForm() {
    this.composeForm = this.fb.group({
      to: [this.email.to, [Validators.required], []],
      subject: [this.email.subject, [Validators.required], []],
      body: [this.email.body, [Validators.required], []]
    })
  }

  autoDrafts() {
    if (this.draftInterval) return
    this.draftInterval = window.setInterval(() => this.save(false, false), 10000)
  }

  close() {
    this.updateUrl()
  }

  updateUrl(id?: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: id ? { compose: id } : {},
      })
  }

  save(isSend = true, isClose = true) {
    if (isSend && Object.values(this.composeForm.controls).some(v => v.status === 'INVALID'))
      return
    if (!isSend
      && this.email.to === this.composeForm.value.to
      && this.email.subject === this.composeForm.value.subject
      && this.email.body === this.composeForm.value.body)
      return isClose ? this.close() : null

    this.title = 'Draft saving...'
    this.store.dispatch(new SaveEmail(
      {
        ...this.email,
        ...this.composeForm.value,
        tabs: isSend ? ['sent'] : ['drafts']
      }
    ))
    if (!this.email._id) {
      this.actions$.pipe(ofType(ADDED_EMAIL)).subscribe(({ email }: any) => {
        if (isSend) {
          this.filterBy$.pipe(take(1)).subscribe(filterBy => {
            this.store.dispatch(new LoadEmails({ ...filterBy }))
          })
        }
        else {
          this.email = { ...email, ...this.composeForm.value }
          this.updateUrl(email._id)
          this.title = 'Draft saved'
          setTimeout(() => this.title = email.subject || 'New Message', 1500)
        }
      })
    }
    else {

      this.actions$.pipe(ofType(UPDATED_EMAIL)).subscribe(({ email }: any) => {
        if (isSend) {
          this.filterBy$.pipe(take(1)).subscribe(filterBy => {
            this.store.dispatch(new LoadEmails({ ...filterBy }))
          })
        }
        else {
          this.email = { ...email, ...this.composeForm.value }
          setTimeout(() => this.title = email.subject || 'New Message', 1500)
        }
      })
    }
    if (isClose) this.close()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
    if (this.draftInterval) clearInterval(this.draftInterval)
  }
}

