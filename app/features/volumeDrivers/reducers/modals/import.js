import {Map} from 'immutable';
import {
  SHOW_IMPORT_VOLUME_DRIVERS,
  CANCEL_IMPORT_VOLUME_DRIVERS,
  IMPORT_VOLUME_DRIVERS_PENDING,
  IMPORT_VOLUME_DRIVERS_FULFILLED,
  IMPORT_VOLUME_DRIVERS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_VOLUME_DRIVERS:
      return initialState.set('show', true);

    case IMPORT_VOLUME_DRIVERS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_VOLUME_DRIVERS:
    case IMPORT_VOLUME_DRIVERS_FULFILLED:
      return initialState;

    case IMPORT_VOLUME_DRIVERS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
