import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService,
    private contactService: ContactService) { }
  title = 'angular-bitcoin'

  ngOnInit() {
    this.userService.loadUser()
    this.contactService.loadContacts()
  }
}
