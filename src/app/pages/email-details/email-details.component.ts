import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { State } from 'src/app/store/store';
// import { Observable, pluck } from 'rxjs';
import { Email } from 'src/app/models/email';
// import { LoadEmail } from 'src/app/store/actions/email.actions';

@Component({
  selector: 'email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.scss']
})
export class EmailDetailsComponent {
  constructor(private route: ActivatedRoute) { 
    }

  email!: Email
  ngOnInit() {
    this.email = this.route.snapshot.data['email']
  }

}
