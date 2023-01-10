import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pluck, lastValueFrom } from 'rxjs';
import { Email, selectedEmail } from 'src/app/models/email';
import { State } from '../../store/store';
import { RemoveEmail,RemoveEmails } from 'src/app/store/actions/email.actions';


@Component({
  selector: 'email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent {
  emails$: Observable<Email[]>;

  selectedEmail!: selectedEmail | null
  selectedEmails: Array<Email> = []
  tab!:string

  constructor(private store: Store<State>,
    private route: ActivatedRoute) {
    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
  }

  ngOnInit(){
    this.tab=this.route.snapshot.data['tab']
  }

  toggleCheckbox(payload: selectedEmail): void {
    if (payload.checked) {
      this.selectedEmails.push(payload.email)
    }
    else {
      const idx=this.selectedEmails.findIndex(e=>e._id===payload.email._id)
      this.selectedEmails.splice(idx,1)
    }
  }

  onRemoveEmails() {
    console.log('emailList: dispatching remove');
    this.store.dispatch(new RemoveEmails(this.selectedEmails))
    this.selectedEmails=[]
  }

}
