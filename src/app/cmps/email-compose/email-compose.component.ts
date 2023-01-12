import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Email } from 'src/app/models/email';
import { SaveEmail } from 'src/app/store/actions/email.actions';
import { State } from 'src/app/store/store';

@Component({
  selector: 'email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.scss']
})
export class EmailComposeComponent {

  constructor(private store: Store<State>,
    private fb: FormBuilder) { }

  @Output() close = new EventEmitter<null>()
  email = {
    to: '',
    subject: '',
    body: ''
  }
  composeForm!: FormGroup
  isMini = false
  isFull = false


  // isValid: boolean = !!this.recipients && !!this.subject && !!this.body

  ngOnInit() {
    // this.contact = this.route.snapshot.data['contact'] || this.contactService.getEmptyContact() as Contact
    this.composeForm = this.fb.group({
      to: [this.email.to, [Validators.required], []],
      subject: [this.email.subject, [Validators.required], []],
      body: [this.email.body, [Validators.required], []]
    })
  }


  toFullScreen() {
  }

  save(isSend = true) {
    console.log('saving')
    // if (!this.isValid) return
    console.log('saving draft/mail (not yet) and closing')
    this.store.dispatch(new SaveEmail(
      {
        ...this.composeForm.value,
        tabs: isSend ? ['sent'] : ['drafts']
      }
    ))

    // if (!isDraft && !this.isValid) return
    // mailService.save(this.recipients, this.subject, this.body, isDraft)
    // this.$emit('close', false)
    this.close.emit()
  }
  discard() {
    // this.recipients = this.subject = this.body = ''
    // this.$emit('close', false)

  }
}

