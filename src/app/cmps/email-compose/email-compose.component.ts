import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.scss']
})
export class EmailComposeComponent {
@Output() close = new EventEmitter<null>()
  recipients = ''
  subject = ''
  body = ''
  isMini = false
  isFull = false
  



  toFullScreen() {
  }

  save(isDraft = false) {
    console.log('saving draft/mail (not yet) and closing')
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

