import {Map} from 'immutable';
import {
  SHOW_IMPORT_LOCATIONS,
  CANCEL_IMPORT_LOCATIONS,
  IMPORT_LOCATIONS_PENDING,
  IMPORT_LOCATIONS_FULFILLED,
  IMPORT_LOCATIONS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_LOCATIONS:
      return initialState.set('show', true);

    case IMPORT_LOCATIONS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_LOCATIONS:
    case IMPORT_LOCATIONS_FULFILLED:
      return initialState;

    case IMPORT_LOCATIONS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
