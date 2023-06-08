import {Map} from 'immutable';
import {
  SHOW_IMPORT_LOCATION_MAPPING,
  CANCEL_IMPORT_LOCATION_MAPPING,
  IMPORT_LOCATION_MAPPING_PENDING,
  IMPORT_LOCATION_MAPPING_FULFILLED,
  IMPORT_LOCATION_MAPPING_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_LOCATION_MAPPING:
      return initialState.set('show', true);

    case IMPORT_LOCATION_MAPPING_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_LOCATION_MAPPING:
    case IMPORT_LOCATION_MAPPING_FULFILLED:
      return initialState;

    case IMPORT_LOCATION_MAPPING_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
