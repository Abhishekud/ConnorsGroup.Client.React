import {Map} from 'immutable';
import {
  SHOW_IMPORT_HIERARCHY_LEVELS_MODAL,
  IMPORT_HIERARCHY_LEVELS_PENDING,
  IMPORT_HIERARCHY_LEVELS_FULFILLED,
  IMPORT_HIERARCHY_LEVELS_REJECTED,
  CANCEL_IMPORT_HIERARCHY_LEVELS,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case SHOW_IMPORT_HIERARCHY_LEVELS_MODAL: {
      return state.set('show', true);
    }

    case IMPORT_HIERARCHY_LEVELS_PENDING:
      return state.set('importing', true);

    case IMPORT_HIERARCHY_LEVELS_FULFILLED:
    case CANCEL_IMPORT_HIERARCHY_LEVELS:
      return initialState;

    case IMPORT_HIERARCHY_LEVELS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
