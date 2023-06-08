import {Map} from 'immutable';
import {
  IMPORT_VOLUME_DRIVER_VALUE_SETS_PENDING,
  IMPORT_VOLUME_DRIVER_VALUE_SETS_FULFILLED,
  IMPORT_VOLUME_DRIVER_VALUE_SETS_REJECTED,
  TOGGLE_IMPORT_VOLUME_DRIVER_VALUE_SETS,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_IMPORT_VOLUME_DRIVER_VALUE_SETS:
      return state.update('show', show => !show);

    case IMPORT_VOLUME_DRIVER_VALUE_SETS_PENDING:
      return state.set('importing', true);

    case IMPORT_VOLUME_DRIVER_VALUE_SETS_FULFILLED:
      return initialState;

    case IMPORT_VOLUME_DRIVER_VALUE_SETS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
