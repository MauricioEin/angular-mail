import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { EmailService } from '../services/email.service';
import {
  EmailAction, SET_ERROR, SAVE_EMAIL, ADDED_EMAIL, UPDATED_EMAIL, LOAD_EMAILS, LOADED_EMAILS,
  REMOVE_EMAIL, REMOVED_EMAIL, REMOVE_EMAILS, REMOVED_EMAILS, LOAD_EMAIL, LOADED_EMAIL, SET_FILTER,
  UPDATE_EMAILS, UPDATED_EMAILS, LOAD_LABELS, LOADED_LABELS, ADDED_LABEL, UPDATED_LABEL, SAVE_LABEL, REMOVE_LABEL, REMOVED_LABEL
} from './actions/email.actions'; // dont forger SET_ERROR after deleting emails imports
import { Email } from '../models/email';

// Nice way to test error handling? localStorage.clear() after emails are presented 
@Injectable()
export class AppEffects {

  loadEmails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_EMAILS),
      tap(() => console.log('Effects: load emails ==> service')),
      switchMap((action) =>
        this.emailService.query(action.filterBy).pipe(
          tap(() => console.log('Effects: Got emails from service, send it to ===> Reducer.')),
          map(({ entities: emails, totalPages }) => ({
            type: LOADED_EMAILS,
            emails,
            filterBy: action.filterBy,
            totalPages,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  });

  loadEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_EMAIL),
      tap(() => console.log('Effects: load email ==> service')),
      switchMap((action) =>
        this.emailService.getById(action.emailId).pipe(
          tap(() => console.log('Effects: Got email from service ===> Reducer')),
          map((email) => ({
            type: LOADED_EMAIL,
            email
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });

  removeEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_EMAIL),
      switchMap((action) =>
        this.emailService.remove(action.emailId).pipe(
          tap(() => console.log('Effects: email removed by service ===> Reducer')),
          map(() => ({
            type: REMOVED_EMAIL,
            emailId: action.emailId,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  })

  removeEmails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_EMAILS),
      switchMap((action) =>
        this.emailService.removeMany(action['emails']).pipe(
          tap(() => console.log('Effects: emails removed by service ===> Reducer')),
          map((removedEmails) => ({
            type: REMOVED_EMAILS,
            removedEmails
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  })

  updatedEmails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UPDATE_EMAILS),
      switchMap((action) =>
        this.emailService.updateMany(action['emails']).pipe(
          tap(() => console.log('Effects: emails updated by service ===> Reducer')),
          map((updatedEmails) => ({
            type: UPDATED_EMAILS,
            updatedEmails
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  })


  saveEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SAVE_EMAIL),
      switchMap((action) =>
        this.emailService.save(action.email).pipe(
          tap(() => console.log('Effects: Email saved by service, inform the ===> Reducer')),
          map((savedEmail) => ({
            type: (action.email._id) ? UPDATED_EMAIL : ADDED_EMAIL,
            email: savedEmail,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })

        )
      )
    )
  })

  loadLabels$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_LABELS),
      tap(() => console.log('Effects: load labels ==> service')),
      switchMap((action) =>
        this.emailService.getLabels().pipe(
          tap(() => console.log('Effects: Got emails from service, send it to ===> Reducer.')),
          map(({ entities: labels }) => ({
            type: LOADED_LABELS,
            labels,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    )
  })

  saveLabel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SAVE_LABEL),
      switchMap((action) =>
        this.emailService.saveLabel(action.label).pipe(
          tap(() => console.log('Effects: Label saved by service, inform the ===> Reducer')),
          map((savedLabel) => ({
            type: (action.label._id) ? UPDATED_LABEL : ADDED_LABEL,
            label: savedLabel,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })

        )
      )
    )
  })

  removeLabel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_LABEL),
      switchMap((action) =>
        this.emailService.removeLabel(action.labelId).pipe(
          tap(() => console.log('Effects: label removed by service ===> Reducer')),
          map(() => ({
            type: REMOVED_LABEL,
            labelId: action.labelId,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  })

  constructor(
    private actions$: Actions<EmailAction>,
    private emailService: EmailService,
  ) { }
}
