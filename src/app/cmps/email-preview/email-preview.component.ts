import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Email, selectedEmail } from 'src/app/models/email';
import { EmailListComponent } from 'src/app/pages/email-list/email-list.component';

@Component({
  selector: 'email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss']
})
export class EmailPreviewComponent {
  @Input() email!: Email;
  @Input() tab!: string;
  @Output() toggleCheckbox = new EventEmitter<selectedEmail>()
  link!: string
  params!: {}


  onToggleCheckbox(ev: Event) {
    const target = ev.target as HTMLInputElement
    const payload: selectedEmail = { checked: target.checked, email: this.email }
    this.toggleCheckbox.emit(payload)
  }
  ngOnInit() {
    this.link = this.tab === 'drafts' ? `/email/${this.tab}` : `/email/${this.tab}/${this.email!._id}`
    if (this.tab === 'drafts') this.params = { compose: this.email!._id }
  }

}