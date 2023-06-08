import {Map} from 'immutable';
import {
  SHOW_IMPORT_CHARACTERISTICS,
  CANCEL_IMPORT_CHARACTERISTICS,
  IMPORT_CHARACTERISTICS_PENDING,
  IMPORT_CHARACTERISTICS_FULFILLED,
  IMPORT_CHARACTERISTICS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_CHARACTERISTICS:
      return initialState.set('show', true);

    case IMPORT_CHARACTERISTICS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_CHARACTERISTICS:
    case IMPORT_CHARACTERISTICS_FULFILLED:
      return initialState;

    case IMPORT_CHARACTERISTICS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
