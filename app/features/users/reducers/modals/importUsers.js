import {Map} from 'immutable';
import {
  SHOW_IMPORT_USERS_MODAL,
  CANCEL_IMPORT_USERS,
  IMPORT_USERS_PENDING,
  IMPORT_USERS_FULFILLED,
  IMPORT_USERS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case SHOW_IMPORT_USERS_MODAL:
      return initialState.set('show', true);

    case IMPORT_USERS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_USERS:
    case IMPORT_USERS_FULFILLED:
      return initialState;

    case IMPORT_USERS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
