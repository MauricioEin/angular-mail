import { Component, Input } from '@angular/core';
import { Email } from 'src/app/models/email';
import { EmailListComponent } from 'src/app/pages/email-list/email-list.component';

@Component({
  selector: 'email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss']
})
export class EmailPreviewComponent {
  @Input() email: Email | null = null;
  // constructor(private emailList: EmailListComponent) {
    
  // }

}
