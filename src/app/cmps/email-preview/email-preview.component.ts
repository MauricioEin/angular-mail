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
  @Input() label!: string;
  
  @Output() toggleCheckbox = new EventEmitter<selectedEmail>()
  @Output() toggleTab = new EventEmitter<Email>()
  link!: string
  params!: {}
  isChecked = false

  ngOnInit() {
    if (this.label) this.link = `/email/label/${this.label}/${this.email!._id}`
    else {
      this.link = this.tab === 'drafts' ? `/email/${this.tab}` : `/email/${this.tab}/${this.email!._id}`
      if (this.tab === 'drafts') this.params = { compose: this.email!._id }
    }
  }

  onToggleCheckbox(ev: Event) {
    const target = ev.target as HTMLInputElement
    const payload: selectedEmail = { checked: target.checked, email: this.email }
    this.toggleCheckbox.emit(payload)
    this.isChecked = target.checked
  }

  onToggleTab(ev: Event, tab: string) {
    ev.stopPropagation()
    var copyEmail: Email = JSON.parse(JSON.stringify(this.email))

    if (copyEmail.tabs?.includes(tab)) {
      const idx = copyEmail.tabs.findIndex(t => t === tab)
      copyEmail.tabs.splice(idx, 1)
    } else copyEmail.tabs?.push(tab)

    this.toggleTab.emit(copyEmail)
  }

}
