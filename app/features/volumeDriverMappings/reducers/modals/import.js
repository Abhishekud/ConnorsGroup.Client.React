import {Map} from 'immutable';
import {
  SHOW_IMPORT_VOLUME_DRIVER_MAPPINGS,
  CANCEL_IMPORT_VOLUME_DRIVER_MAPPINGS,
  IMPORT_VOLUME_DRIVER_MAPPINGS_PENDING,
  IMPORT_VOLUME_DRIVER_MAPPINGS_FULFILLED,
  IMPORT_VOLUME_DRIVER_MAPPINGS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_VOLUME_DRIVER_MAPPINGS:
      return initialState.set('show', true);

    case IMPORT_VOLUME_DRIVER_MAPPINGS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_VOLUME_DRIVER_MAPPINGS:
    case IMPORT_VOLUME_DRIVER_MAPPINGS_FULFILLED:
      return initialState;

    case IMPORT_VOLUME_DRIVER_MAPPINGS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
