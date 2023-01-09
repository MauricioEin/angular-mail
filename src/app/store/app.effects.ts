import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { EmailService } from '../services/email.service';
import { EmailAction,SET_ERROR, SAVE_EMAIL, ADDED_EMAIL, UPDATED_EMAIL, LOAD_EMAILS, LOADED_EMAILS, REMOVE_EMAIL, REMOVED_EMAIL, LOAD_EMAIL, LOADED_EMAIL } from './actions/email.actions'; // dont forger SET_ERROR after deleting items imports

// TODO: Add ItemFilter

// Nice way to test error handling? localStorage.clear() after items are presented 
@Injectable()
export class AppEffects {

  loadEmails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_EMAILS),
      tap(() => console.log('Effects: load emails ==> service')),
      switchMap((action) =>
        this.emailService.query(action.filterBy).pipe(
          tap(() => console.log('Effects: Got emails from service, send it to ===> Reducer')),
          map((emails) => ({
            type: LOADED_EMAILS,
            emails,
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
  constructor(
    private actions$: Actions<EmailAction>,
    private emailService: EmailService
  ) { }
}
