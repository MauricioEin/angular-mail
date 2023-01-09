import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { Email } from '../models/email';
import { LoadingEmails } from '../store/actions/email.actions';
import { EmailState } from '../store/reducers/email.reducer';
import { UtilService } from './util.service';

// import * as demoMails from '../../assets/data/demoMails.json' 

import { storageService } from './async-storage.service'

const ENTITY = 'email'

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    loggedinUser = {
        email: 'user@gmail.com',
        fullname: 'Mahatma Appsus'
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
        console.log('emails:', emails)
        if (!emails || emails.length === 0) {
            console.log('BUU');
            localStorage.setItem(ENTITY, JSON.stringify(this.createEmails()))
        }


    }


    private createEmails(): Email[] {

        let emails = []
        for (var i = 0; i < 16; i++) {
            emails.push(this._createEmail())
        }
        return emails
        // return demoMails
        // return ['Vue', 'Angular', 'React', 'Redux', 'NGRX', 'Vuex']
        //   .map(txt => ({id: storageService.makeId(), txt}))
    }
    private _createEmail(): Email {
        const name = this.utilService.makeName()
        const email = {
            _id: this.utilService.makeId(),
            tab: ['inbox'],
            name,
            subject: this.utilService.makeLorem(3),
            body: this.utilService.makeLorem(40),
            isRead: false,
            sentAt: Date.now(),
            from: `${name}@gmail.com`,
            to: this.loggedinUser.email,
            labels: []

        }
        return email

    }

    query(filterBy = ''): Observable<Email[]> {

        this.store.dispatch(new LoadingEmails());
        console.log('EmailService: Return Emails ===> effect');
        return from(storageService.query(ENTITY) as Promise<Email[]>)
        // return new Observable((observer) => observer.next(emails));
    }

    getById(emailId: string): Observable<Email> {
        console.log('EmailService: Return Email ===> effect');
        return from(storageService.get(ENTITY, emailId) as Promise<Email>)
        // return from(axios.get(URL + emailId) as Promise<Email>)
    }

    remove(emailId: string): Observable<boolean> {

        // throw new Error('Baba Ji')
        console.log('EmailService: Removing Emails ===> effect');
        return from(storageService.remove(ENTITY, emailId))
    }


    save(email: Email): Observable<Email> {
        const method = (email._id) ? 'put' : 'post'
        const prmSavedEmail = storageService[method](ENTITY, email)
        console.log('EmailService: Saving Email ===> effect');
        return from(prmSavedEmail) as Observable<Email>
    }

}


// const demoMails = [
//   {
//       "id": "e101",
//       "subject": "Your memory is almost full",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1665058094343,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e102",
//       "subject": "Meeting updates",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": false,
//       "isTrash": true,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": true,
//       "isScheduled": false,
//       "sentAt": 1664058094343,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e103",
//       "subject": "11.2.2022 Hearing Protocol",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": true,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": true,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1663058094343,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e104",
//       "subject": "Your LinkedIn account has been viewed by 47 people",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1662058094343,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e105",
//       "subject": "A brief update",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1661058094343,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e106",
//       "subject": "Photos from Chile",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1660058094343,
//       "from": "kuki@kuki.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e107",
//       "subject": "Delivery",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1660058094343,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e108",
//       "subject": "PROMO",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1651133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e109",
//       "subject": "About aur last meeting",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1651133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e110",
//       "subject": "Ps- with files attached",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": true,
//       "isScheduled": false,
//       "sentAt": 1651133930594,
//       "from": "kuki@kuki.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e111",
//       "subject": "Dinner reservation",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": false,
//       "isTrash": true,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1651133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e112",
//       "subject": "Ilan's Bar Mitzva",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": true,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1651133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e113",
//       "subject": "Your order is on it's way",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": true,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1651133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e114",
//       "subject": "Parents meeting",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": true,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1651133930594,
//       "from": "kuki@kuki.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e115",
//       "subject": "Parent Meeting - Junior High School",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": true,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1651133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e116",
//       "subject": "New appointment with dr. Holder",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1651133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e117",
//       "subject": "Reminder: Sumbit date",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": true,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1651133930594,
//       "from": "kuki@kuki.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e118",
//       "subject": "New projects for you",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": true,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": true,
//       "isScheduled": false,
//       "sentAt": 1651133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e119",
//       "subject": "New Post reactions",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1651133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e120",
//       "subject": "re: CV Yossi Levy",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": true,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": true,
//       "isScheduled": false,
//       "sentAt": 1651133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e201",
//       "subject": "Your memory is almost full",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1645058094343,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e202",
//       "subject": "Meeting updates",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": false,
//       "isTrash": true,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": true,
//       "isScheduled": false,
//       "sentAt": 1644058094343,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e203",
//       "subject": "11.2.2022 Hearing Protocol",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": true,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": true,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1643058094343,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e204",
//       "subject": "Your LinkedIn account has been viewed by 47 people",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1642058094343,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e205",
//       "subject": "A brief update",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1641058094343,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e206",
//       "subject": "Photos from Chile",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1640058094343,
//       "from": "kuki@kuki.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e207",
//       "subject": "Delivery",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1640058094343,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e208",
//       "subject": "PROMO",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1551133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e209",
//       "subject": "About aur last meeting",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1551133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e210",
//       "subject": "Ps- with files attached",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": true,
//       "isScheduled": false,
//       "sentAt": 1551133930594,
//       "from": "kuki@kuki.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e211",
//       "subject": "Dinner reservation",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": false,
//       "isTrash": true,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1551133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e212",
//       "subject": "Ilan's Bar Mitzva",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": true,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1551133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e213",
//       "subject": "Your order is on it's way",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": true,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1551133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e214",
//       "subject": "Parents meeting",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": true,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1551133930594,
//       "from": "kuki@kuki.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e215",
//       "subject": "Parent Meeting - Junior High School",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": true,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": true,
//       "sentAt": 1551133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e216",
//       "subject": "New appointment with dr. Holder",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1551133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e217",
//       "subject": "Reminder: Sumbit date",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": true,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1551133930594,
//       "from": "kuki@kuki.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e218",
//       "subject": "New projects for you",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": false,
//       "isStarred": true,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": true,
//       "isScheduled": false,
//       "sentAt": 1551133930594,
//       "from": "lala@lala.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e219",
//       "subject": "New Post reactions",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": false,
//       "isTrash": false,
//       "isSpam": true,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": false,
//       "isScheduled": false,
//       "sentAt": 1551133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   },
//   {
//       "id": "e220",
//       "subject": "re: CV Yossi Levy",
//       "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quod ipsam recusandae assumenda pariatur, incidunt, tenetur nulla quas odio atque aperiam veniam praesentium alias, cum optio consequuntur? Optio, maxime accusamus",
//       "isRead": true,
//       "isStarred": true,
//       "isTrash": false,
//       "isSpam": false,
//       "isImportant": false,
//       "isDraft": false,
//       "isSnoozed": true,
//       "isScheduled": false,
//       "sentAt": 1551133930594,
//       "from": "momo@momo.com",
//       "to": "user@appsus.com"
//   }
// ]