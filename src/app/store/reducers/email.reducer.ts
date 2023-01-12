import { SET_LOADING, LOADED_EMAILS, REMOVED_EMAIL, REMOVED_EMAILS, ADDED_EMAIL, UPDATED_EMAIL, UPDATED_EMAILS, LOADED_EMAIL, SET_ERROR, SET_FILTER, SetFilter } from '../actions/email.actions';
import { Email } from 'src/app/models/email';
import { FilterBy } from 'src/app/models/filterBy';

export interface EmailState {
  emails: Email[];
  email: Email | null;
  isLoading: boolean;
  error: string;
  filterBy: FilterBy,
  totalPages: number
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
    pageSize: 5
  },
  totalPages: 0
};

export function reducer(state: EmailState = initialState, action: any): EmailState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      // console.log(`Reducer: Setting isLoading to ${isLoading}`);
      return { ...state, isLoading, error: '' };
    }
    case SET_FILTER: {
      const { filterBy } = action;
      console.log(`Reducer: Setting filter`);
      return { ...state, filterBy: { ...state.filterBy, ...filterBy }, error: '' };
    }

    case SET_ERROR: {
      const { error } = action;
      console.log(`Reducer: Setting email error`, error);
      return { ...state, error, isLoading: false };
    }
    case LOADED_EMAILS: {
      const { emails, filterBy, totalPages } = action;
      
      // console.log(`Reducer: Setting loaded emails (${emails.length}) emails`);
      return { ...state, emails, filterBy, totalPages, isLoading: false, error: '' };
    }
    case LOADED_EMAIL: {
      const { email } = action;
      console.log(`Reducer: Setting loaded email ${email._id}`);
      return { ...state, email, error: '' };

    }
    case REMOVED_EMAIL: {
      const { emailId } = action;
      console.log('Reducer: Removing email:', emailId);
      const emails = state.emails.filter(email => email._id !== emailId)
      return { ...state, emails, error: '' };
    }
    case REMOVED_EMAILS: {
      const { emails } = action;
      console.log('Reducer finish move of removing many')
      return { ...state, emails, error: '' };
    }

    case ADDED_EMAIL: {
      const { email } = action;
      console.log('Reducer: Adding email:', email);
      const emails = [...state.emails, email]
      return { ...state, emails, error: '' };
    }
    case UPDATED_EMAIL: {
      const { email } = action;
      console.log('Reducer: Updating email:', email);
      const emails = state.emails.map(currEmail => (currEmail._id === email.id) ? email : currEmail)
      return { ...state, emails, email: null, error: '' };
    }
    case UPDATED_EMAILS: {
      const { updatedEmails } = action;
      console.log('Reducer: Updating emails:', updatedEmails);
      const emails: Email[] = JSON.parse(JSON.stringify(state.emails))

      updatedEmails.forEach((updated: Email) => {
        const idx = emails.findIndex(e => e._id === updated._id)
        emails.splice(idx, 1, updated)
      })

      return { ...state, emails, email: null, error: '' };
    }
    default:
      return state;
  }
}
