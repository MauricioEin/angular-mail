import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Email, selectedEmail } from 'src/app/models/email';
import { EmailListComponent } from 'src/app/pages/email-list/email-list.component';

@Component({
  selector: 'email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss']
})
export class EmailPreviewComponent {
  @Input() email!: Email ;
  @Output() toggleCheckbox = new EventEmitter<selectedEmail>()
  // constructor(private emailList: EmailListComponent) {
  // }

  onToggleCheckbox(ev: Event) {

    const target = ev.target as HTMLInputElement
    const payload: selectedEmail = { checked: target.checked, email: this.email }
    this.toggleCheckbox.emit(payload)


  }



}
