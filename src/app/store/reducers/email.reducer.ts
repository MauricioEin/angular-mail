import { SET_LOADING, LOADED_EMAILS, REMOVED_EMAIL, REMOVED_EMAILS, ADDED_EMAIL, UPDATED_EMAIL, UPDATED_EMAILS, LOADED_EMAIL, SET_ERROR, SET_FILTER, LOADED_LABELS, UPDATED_LABEL, ADDED_LABEL, REMOVED_LABEL, SET_FOLDER } from '../actions/email.actions';
import { Email } from 'src/app/models/email';
import { FilterBy } from 'src/app/models/filterBy';
import { Label } from 'src/app/models/label';

export interface EmailState {
  emails: Email[];
  email: Email | null;
  isLoading: boolean;
  error: string;
  filterBy: FilterBy,
  totalPages: number,
  labels: Label[],
  folder: string
}

const initialState: EmailState = {
  emails: [],
  email: null,
  isLoading: false,
  error: '',
  filterBy: {
    txt: '',
    tab: 'inbox',
    page: 0,
    pageSize: 24
  },
  totalPages: 0,
  labels: [],
  folder: ''
};

export function reducer(state: EmailState = initialState, action: any): EmailState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      return { ...state, isLoading, error: '' };
    }
    case SET_FILTER: {
      const { filterBy } = action;
      return { ...state, filterBy: { ...state.filterBy, ...filterBy }, error: '' };
    }
    case SET_FOLDER: {
      const { folder } = action;
      return { ...state, folder, error: '' };
    }

    case SET_ERROR: {
      const { error } = action;
      return { ...state, error, isLoading: false };
    }
    case LOADED_LABELS: {
      const { labels } = action;
      return { ...state, labels, isLoading: false, error: '' };
    }
    case LOADED_EMAILS: {
      const { emails, filterBy, totalPages } = action;
      return { ...state, emails, filterBy, totalPages, isLoading: false, error: '' };
    }
    case LOADED_EMAIL: {
      const { email } = action;
      return { ...state, email, error: '' };
    }
    case REMOVED_EMAIL: {
      const { emailId } = action;
      const emails = state.emails.filter(email => email._id !== emailId)
      return { ...state, emails, error: '' };
    }
    case REMOVED_EMAILS: {
      const { removedEmails } = action;
      const emails: Email[] = JSON.parse(JSON.stringify(state.emails))
      removedEmails.forEach((removed: Email) => {
        const idx = emails.findIndex(e => e._id === removed._id)
        emails.splice(idx, 1)
      })

      return { ...state, emails, error: '' };
    }

    case ADDED_EMAIL: {
      const { email } = action;
      const emails = [...state.emails, email]
      return { ...state, emails, error: '' };
    }
    case UPDATED_EMAIL: {
      const { email } = action;
      const emails = state.emails.map(currEmail => (currEmail._id === email.id) ? email : currEmail)
      return { ...state, emails, email: null, error: '' };
    }
    case UPDATED_EMAILS: {
      const { updatedEmails } = action;
      const emails: Email[] = JSON.parse(JSON.stringify(state.emails))

      updatedEmails.forEach((updated: Email) => {
        const idx = emails.findIndex(e => e._id === updated._id)
        emails.splice(idx, 1, updated)
      })
      return { ...state, emails, email: null, error: '' };
    }
    case ADDED_LABEL: {
      const { label } = action;
      const labels = [...state.labels, label]
      return { ...state, labels, error: '' };
    }
    case UPDATED_LABEL: {
      const { label } = action;
      const labels = state.labels.map(currLabel => (currLabel._id === label._id) ? label : currLabel)
      return { ...state, labels, error: '' };
    }

    case REMOVED_LABEL: {
      const { labelId } = action;
      const labels = state.labels.filter(currLabel => currLabel._id !== labelId)
      return { ...state, labels, error: '' };
    }


    default:
      return state;
  }
}
