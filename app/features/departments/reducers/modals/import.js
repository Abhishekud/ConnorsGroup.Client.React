import {Map} from 'immutable';
import {
  TOGGLE_IMPORT_DEPARTMENTS,
  IMPORT_DEPARTMENTS_PENDING,
  IMPORT_DEPARTMENTS_FULFILLED,
  IMPORT_DEPARTMENTS_REJECTED,
} from '../../actions';
const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_IMPORT_DEPARTMENTS:
      return state.update('show', show => !show);

    case IMPORT_DEPARTMENTS_PENDING:
      return state.set('importing', true);

    case IMPORT_DEPARTMENTS_FULFILLED:
      return initialState;

    case IMPORT_DEPARTMENTS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
