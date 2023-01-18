import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pluck } from 'rxjs';
// import { Store } from '@ngrx/store';
// import { State } from 'src/app/store/store';
// import { Observable, pluck } from 'rxjs';
import { Email } from 'src/app/models/email';
import { Label } from 'src/app/models/label';
import { UpdatedEmail, UpdateEmails } from 'src/app/store/actions/email.actions';
import { State } from 'src/app/store/store';
// import { LoadEmail } from 'src/app/store/actions/email.actions';

@Component({
  selector: 'email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.scss']
})
export class EmailDetailsComponent {
  constructor(private route: ActivatedRoute,
    private store: Store<State>) {
    this.labels$ = this.store.select('emailState').pipe(pluck('labels'));
  }
  email!: Email
  isLabelMenu = false
  labels$: Observable<Label[]>


  ngOnInit() {
    this.email = this.route.snapshot.data['email']
  }

  updateLabels(labels: string[]) {
    console.log('lables:', labels)
    this.store.dispatch(new UpdateEmails([{ ...this.email, labels }]))
    this.isLabelMenu=false
  }

}
