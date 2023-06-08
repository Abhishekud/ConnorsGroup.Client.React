import {Map} from 'immutable';
import {
  SHOW_IMPORT_PARTS,
  CANCEL_IMPORT_PARTS,
  IMPORT_PARTS_PENDING,
  IMPORT_PARTS_FULFILLED,
  IMPORT_PARTS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_PARTS:
      return initialState.set('show', true);

    case IMPORT_PARTS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_PARTS:
    case IMPORT_PARTS_FULFILLED:
      return initialState;

    case IMPORT_PARTS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
