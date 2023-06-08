import {Map} from 'immutable';
import {
  TOGGLE_IMPORT_UNIT_OF_MEASURES,
  IMPORT_UNIT_OF_MEASURES_PENDING,
  IMPORT_UNIT_OF_MEASURES_FULFILLED,
  IMPORT_UNIT_OF_MEASURES_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_IMPORT_UNIT_OF_MEASURES:
      return state.update('show', show => !show);

    case IMPORT_UNIT_OF_MEASURES_PENDING:
      return state.set('importing', true);

    case IMPORT_UNIT_OF_MEASURES_FULFILLED:
      return initialState;

    case IMPORT_UNIT_OF_MEASURES_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
