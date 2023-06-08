import {Map} from 'immutable';
import {
  SHOW_IMPORT_VOLUME_DRIVER_VALUES,
  CANCEL_IMPORT_VOLUME_DRIVER_VALUES,
  IMPORT_VOLUME_DRIVER_VALUES_PENDING,
  IMPORT_VOLUME_DRIVER_VALUES_FULFILLED,
  IMPORT_VOLUME_DRIVER_VALUES_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_VOLUME_DRIVER_VALUES:
      return initialState.set('show', true);

    case IMPORT_VOLUME_DRIVER_VALUES_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_VOLUME_DRIVER_VALUES:
    case IMPORT_VOLUME_DRIVER_VALUES_FULFILLED:
      return initialState;

    case IMPORT_VOLUME_DRIVER_VALUES_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
