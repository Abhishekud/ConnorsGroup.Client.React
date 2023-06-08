import {Map} from 'immutable';
import {
  SHOW_IMPORT_LOCATION_PROFILES,
  CANCEL_IMPORT_LOCATION_PROFILES,
  IMPORT_LOCATION_PROFILES_PENDING,
  IMPORT_LOCATION_PROFILES_FULFILLED,
  IMPORT_LOCATION_PROFILES_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_LOCATION_PROFILES:
      return initialState.set('show', true);

    case IMPORT_LOCATION_PROFILES_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_LOCATION_PROFILES:
    case IMPORT_LOCATION_PROFILES_FULFILLED:
      return initialState;

    case IMPORT_LOCATION_PROFILES_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
