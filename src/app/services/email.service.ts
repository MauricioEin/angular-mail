import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from, filter } from 'rxjs';
import { Email } from '../models/email';
import { LoadingEmails } from '../store/actions/email.actions';
import { EmailState } from '../store/reducers/email.reducer';
import { UtilService } from './util.service';

// import * as demoMails from '../../assets/data/demoMails.json' 

import { storageService } from './async-storage.service'
import { FilterBy } from '../models/filterBy';

const ENTITY = 'email'

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    loggedinUser = {
        email: 'user@gmail.com',
        fullname: 'Best User'
    }

    constructor(private store: Store<EmailState>,
        private http: HttpClient,
        private utilService: UtilService) {

        // http.get('http://www.filltext.com/?rows=10&id={index}&name={username}')
        // .subscribe(res => {
        //   console.log('RES', res);
        // })

        // If empty - load test data to storage
        // const emails = demoMails
        const emails = JSON.parse(localStorage.getItem(ENTITY) || 'null');

        if (!emails || emails.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this.createEmails()))
        }


    }


    private createEmails(): Email[] {

        let emails = []
        for (var i = 0; i < 8; i++) {
            emails.push(this._createEmail())
        }
        return emails
    }
    private _createEmail(): Email {
        const isIncoming = Math.random() > .5 ? true : false
        const name = this.utilService.makeName()
        const email = {
            _id: this.utilService.makeId(),
            tabs: Math.random() > .5 ? ['important','inbox'] : ['inbox'],
            name: isIncoming ? name : this.loggedinUser.fullname,
            subject: this.utilService.makeLorem(3),
            body: this.utilService.makeLorem(40),
            isRead: (Math.random() > .5 && isIncoming) ? false : true,
            sentAt: Date.now(),
            from: isIncoming ? `${name.split(' ')[0].toLowerCase()}@gmail.com` : this.loggedinUser.email,
            to: isIncoming ? this.loggedinUser.email : `${name.split(' ')[0].toLowerCase()}@gmail.com`,
            labels: []
        }
        if (email.to === this.loggedinUser.email
            && !['spam', 'trash'].some(tab => email.tabs.includes(tab)))
            email.tabs.push('inbox')
        else if (email.from === this.loggedinUser.email
            && !['drafts', 'trash'].some(tab => email.tabs.includes(tab)))
            email.tabs.push('sent')

        return email
    }

    query(filterBy: FilterBy = {}): Observable<{ entities: Email[], totalPages: number }> {
        this.store.dispatch(new LoadingEmails());
        // console.log('EmailService: Return Emails ===> effect');
        return from(storageService.query(ENTITY, filterBy) as Promise<{ entities: Email[], totalPages: number }>)
        // return new Observable((observer) => observer.next(emails));
    }

    getById(emailId: string): Observable<Email> {
        // console.log('EmailService: Return Email ===> effect');
        return from(storageService.get(ENTITY, emailId) as Promise<Email>)
        // return from(axios.get(URL + emailId) as Promise<Email>)
    }

    remove(emailId: string): Observable<boolean> {

        // throw new Error('Baba Ji')
        // console.log('EmailService: Removing Email ===> effect');
        return from(storageService.remove(ENTITY, emailId))
    }
    removeMany(emails: Email[]): Observable<Email[]> {
        // console.log('EmailService: Removing Emails ===> effect');
        return from(storageService.removeMany(ENTITY, emails) as Promise<Email[]>)
    }


    save(email: Email): Observable<Email> {
        const method = (email._id) ? 'put' : 'post'
        // console.log('SERVICE:', method, 'email:', email)
        if (!email._id) email = {
            ...email,
            from: this.loggedinUser.email,
            name: this.loggedinUser.fullname,
            isRead: true,
            labels: [],
        }
        const prmSavedEmail = storageService[method](ENTITY, email)
        // console.log('EmailService: Saving Email ===> effect');
        return from(prmSavedEmail) as Observable<Email>
    }

    updateMany(emails: Email[]): Observable<Email[]> {
        // console.log('EmailService: updated Emails ===> effect');
        return from(storageService.putMany(ENTITY, emails) as Promise<Email[]>)
    }

}

