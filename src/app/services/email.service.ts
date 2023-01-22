import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from, filter } from 'rxjs';
import { Email } from '../models/email';
import { LoadingEmails } from '../store/actions/email.actions';
import { EmailState } from '../store/reducers/email.reducer';
import { UtilService } from './util.service';


import { storageService } from './async-storage.service'
import { FilterBy } from '../models/filterBy';
import { Label } from '../models/label';

export const EMAIL_KEY = 'email'
export const LABEL_KEY = 'label'

@Injectable({
    providedIn: 'root',
})
export class EmailService {

    loggedinUser = {
        email: 'user@gmail.com',
        fullname: 'User who'
    }

    constructor(private store: Store<EmailState>,
        private http: HttpClient,
        private utilService: UtilService) {

        const emails = JSON.parse(localStorage.getItem(EMAIL_KEY) || 'null');
        if (!emails || emails.length === 0) {
            localStorage.setItem(EMAIL_KEY, JSON.stringify(this._createEmails()))
        }

        const labels = JSON.parse(localStorage.getItem(LABEL_KEY) || 'null');
        if (!labels || labels.length === 0) {
            localStorage.setItem(LABEL_KEY, '[]')
        }

    }

    query(filterBy: FilterBy = {}): Observable<{ entities: Email[], totalPages: number }> {
        this.store.dispatch(new LoadingEmails());
        // console.log('EmailService: Return Emails ===> effect');
        return from(storageService.query(EMAIL_KEY, filterBy) as Promise<{ entities: Email[], totalPages: number }>)
        // return new Observable((observer) => observer.next(emails));
    }

    getById(emailId: string): Observable<Email> {
        // console.log('EmailService: Return Email ===> effect');
        return from(storageService.get(EMAIL_KEY, emailId) as Promise<Email>)
        // return from(axios.get(URL + emailId) as Promise<Email>)
    }

    remove(emailId: string): Observable<boolean> {
        // console.log('EmailService: Removing Email ===> effect');
        return from(storageService.remove(EMAIL_KEY, emailId))
    }

    removeMany(emails: Email[]): Observable<Email[]> {
        // console.log('EmailService: Removing Emails ===> effect');
        return from(storageService.removeMany(EMAIL_KEY, emails) as Promise<Email[]>)
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
        const prmSavedEmail = storageService[method](EMAIL_KEY, email)
        // console.log('EmailService: Saving Email ===> effect');
        return from(prmSavedEmail) as Observable<Email>
    }

    updateMany(emails: Email[]): Observable<Email[]> {
        // console.log('EmailService: updated Emails ===> effect');
        return from(storageService.putMany(EMAIL_KEY, emails) as Promise<Email[]>)
    }

    private _createEmails(): Email[] {

        let emails = []
        for (var i = 0; i < 60; i++) {
            emails.push(this._createEmail())
        }
        return emails
    }
    private _createEmail(): Email {
        const isIncoming = Math.random() > .5 ? true : false
        const name = this.utilService.makeName()
        const email = {
            _id: this.utilService.makeId(),
            tabs: isIncoming ? [Math.random() > .5 ? 'starred' : 'important', Math.random() > .3 ? 'inbox' : 'spam'] : [Math.random() > .5 ? 'important' : 'starred', 'sent'],
            name: isIncoming ? name : this.loggedinUser.fullname,
            subject: this.utilService.makeLorem(3),
            body: this.utilService.makeLorem(40),
            isRead: (Math.random() > .5 && isIncoming) ? false : true,
            sentAt: Date.now(),
            from: isIncoming ? `${name.split(' ')[0].toLowerCase()}@gmail.com` : this.loggedinUser.email,
            to: isIncoming ? this.loggedinUser.email : `${name.split(' ')[0].toLowerCase()}@gmail.com`,
            labels: []
        }
        return email
    }



    // LABEL FUNCTIONS:
    getLabels() {
        return from(storageService.query(LABEL_KEY) as Promise<{ entities: Label[], totalPages: number }>)
        // return new Observable((observer) => observer.next(emails));
    }

    saveLabel(label: Label): Observable<Label> {
        const method = (label._id) ? 'putLabel' : 'postLabel'
        const prmSavedLabel = storageService[method](LABEL_KEY, label)
        // console.log('EmailService: Saving Email ===> effect');
        return from(prmSavedLabel) as Observable<Label>
    }

    removeLabel(labelId: string): Observable<boolean> {
        // console.log('EmailService: Removing Email ===> effect');
        return from(storageService.remove(LABEL_KEY, labelId))
    }

}

