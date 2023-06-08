import {Map} from 'immutable';
import {
  SHOW_IMPORT_LOCATION_ATTRIBUTES,
  CANCEL_IMPORT_LOCATION_ATTRIBUTES,
  IMPORT_LOCATION_ATTRIBUTES_PENDING,
  IMPORT_LOCATION_ATTRIBUTES_FULFILLED,
  IMPORT_LOCATION_ATTRIBUTES_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_LOCATION_ATTRIBUTES:
      return initialState.set('show', true);

    case IMPORT_LOCATION_ATTRIBUTES_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_LOCATION_ATTRIBUTES:
    case IMPORT_LOCATION_ATTRIBUTES_FULFILLED:
      return initialState;

    case IMPORT_LOCATION_ATTRIBUTES_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
