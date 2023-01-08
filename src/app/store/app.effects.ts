import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ItemService } from '../services/item.service';
import { ItemAction, SAVE_ITEM, ADDED_ITEM, UPDATED_ITEM, LOAD_ITEMS, LOADED_ITEMS, REMOVE_ITEM, REMOVED_ITEM, LOAD_ITEM, LOADED_ITEM, SET_ERROR } from './actions/item.actions';
import { EmailService } from '../services/email.service';
import { EmailAction, SAVE_EMAIL, ADDED_EMAIL, UPDATED_EMAIL, LOAD_EMAILS, LOADED_EMAILS, REMOVE_EMAIL, REMOVED_EMAIL, LOAD_EMAIL, LOADED_EMAIL } from './actions/email.actions'; // dont forger SET_ERROR after deleting items imports

// TODO: Add ItemFilter

// Nice way to test error handling? localStorage.clear() after items are presented 
@Injectable()
export class AppEffects {

  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_ITEMS),
      tap(() => console.log('Effects: load items ==> service')),
      switchMap((action) =>
        this.itemService.query(action.filterBy).pipe(
          tap(() => console.log('Effects: Got items from service, send it to ===> Reducer')),
          map((items) => ({
            type: LOADED_ITEMS,
            items,
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
  loadItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_ITEM),
      tap(() => console.log('Effects: load item ==> service')),
      switchMap((action) =>
        this.itemService.getById(action.itemId).pipe(
          tap(() => console.log('Effects: Got item from service ===> Reducer')),
          map((item) => ({
            type: LOADED_ITEM,
            item
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
  removeItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_ITEM),
      switchMap((action) =>
        this.itemService.remove(action.itemId).pipe(
          tap(() => console.log('Effects: Item removed by service ===> Reducer')),
          map(() => ({
            type: REMOVED_ITEM,
            itemId: action.itemId,
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
  saveItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SAVE_ITEM),
      switchMap((action) =>
        this.itemService.save(action.item).pipe(
          tap(() => console.log('Effects: Item saved by service, inform the ===> Reducer')),
          map((savedItem) => ({
            type: (action.item.id) ? UPDATED_ITEM : ADDED_ITEM,
            item: savedItem,
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
  })

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
    private actions$: Actions<ItemAction|EmailAction>,
    private itemService: ItemService,
    private emailService: EmailService
  ) { }
}
