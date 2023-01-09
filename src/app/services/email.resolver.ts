import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Email } from '../models/email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolver implements Resolve<Email> {
  constructor(private emailService: EmailService, private router:Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Email> {
    const emailId = route.params['id']
    return this.emailService.getById(emailId)
  }
}
