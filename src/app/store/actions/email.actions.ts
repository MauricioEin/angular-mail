import { Action } from '@ngrx/store';
import { Email } from 'src/app/models/email';
import { FilterBy } from 'src/app/models/filterBy';
import { Label } from 'src/app/models/label';

export const SET_LOADING = '[email] loading';
export const SET_ERROR = '[email] error';
export const SET_FILTER = '[email] filter';
export const SET_FOLDER = '[email] folder';
export const LOAD_LABELS = '[label]s load';
export const LOAD_EMAILS = '[email]s load';
export const LOAD_EMAIL = '[email] load';
export const LOADED_EMAIL = '[email] loaded';
export const LOADED_EMAILS = '[email]s loaded';
export const LOADED_LABELS = '[label]s loaded';
export const REMOVE_EMAIL = '[email] remove';
export const REMOVE_EMAILS = '[email]s remove';
export const REMOVED_EMAIL = '[email] removed';
export const REMOVED_EMAILS = '[email]s removed';
export const SAVE_EMAIL = '[email] saved';
export const SAVE_LABEL = '[label] saved';
export const UPDATE_EMAILS = '[email]s saved';
export const ADDED_EMAIL = '[email] added';
export const ADDED_LABEL = '[label] added';
export const UPDATED_EMAIL = '[email] updated';
export const UPDATED_LABEL = '[label] updated';
export const UPDATED_EMAILS = '[email]s updated';
export const REMOVE_LABEL = '[label] remove';
export const REMOVED_LABEL = '[label] removed';


export type EmailAction = LoadEmails | LoadEmail |
  RemoveEmail | SaveEmail | RemoveEmails | UpdateEmails |
  LoadLabels | SaveLabel | RemoveLabel

export class LoadEmails implements Action {
  readonly type = LOAD_EMAILS;
  constructor(public filterBy: FilterBy = {}) { }
}
export class LoadEmail implements Action {
  readonly type = LOAD_EMAIL;
  constructor(public emailId: string = '') { }
}
export class LoadLabels implements Action {
  readonly type = LOAD_LABELS;
  constructor(public filterBy: FilterBy = {}) { }
}
export class SaveEmail implements Action {
  readonly type = SAVE_EMAIL;
  constructor(public email: Email) { }
}
export class SaveLabel implements Action {
  readonly type = SAVE_LABEL;
  constructor(public label: Label) { }
}
export class UpdateEmails implements Action {
  readonly type = UPDATE_EMAILS;
  constructor(public emails: Email[]) { }
}
export class RemoveEmail implements Action {
  readonly type = REMOVE_EMAIL;
  constructor(public emailId: string) { }
}
export class RemoveEmails implements Action {
  readonly type = REMOVE_EMAILS;
  constructor(public emails: Email[]) { }
}
export class RemoveLabel implements Action {
  readonly type = REMOVE_LABEL;
  constructor(public labelId: string) { }
}





export class LoadedEmails implements Action {
  readonly type = LOADED_EMAILS;
  constructor(public emails: Email[], public filterBy: FilterBy, public totalPages: number) { }
}
export class LoadedEmail implements Action {
  readonly type = LOADED_EMAIL;
  constructor(public email: Email) { }
}
export class LoadedLabels implements Action {
  readonly type = LOADED_LABELS;
  constructor(public labels: Label[]) { }
}

export class RemovedEmail implements Action {
  readonly type = REMOVED_EMAIL;
  constructor(public emailId: string) { }
}
export class RemovedEmails implements Action {
  readonly type = REMOVED_EMAILS;
  constructor(public removedEmails: Email[]) { }
}
export class AddedEmail implements Action {
  readonly type = ADDED_EMAIL;
  constructor(public email: Email) { }
}
export class UpdatedEmail implements Action {
  readonly type = UPDATED_EMAIL;
  constructor(public email: Email) { }
}
export class AddedLabel implements Action {
  readonly type = ADDED_LABEL;
  constructor(public label: Label) { }
}
export class UpdatedLabel implements Action {
  readonly type = UPDATED_LABEL;
  constructor(public label: Label) { }
}
export class UpdatedEmails implements Action {
  readonly type = UPDATED_EMAILS;
  constructor(public updatedEmails: Email[]) { }
}
export class LoadingEmails implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) { }
}
export class EmailError implements Action {
  readonly type = SET_ERROR;
  constructor(public error: string) { }
}

export class SetFolder implements Action {
  readonly type = SET_FOLDER
  constructor(public folder: string) { }
}

export class RemovedLabel implements Action {
  readonly type = REMOVED_LABEL;
  constructor(public labelId: string) { }
}

