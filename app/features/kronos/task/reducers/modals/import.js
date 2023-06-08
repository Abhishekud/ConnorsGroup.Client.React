import {Map} from 'immutable';
import {
  SHOW_IMPORT_KRONOS_TASKS,
  CANCEL_IMPORT_KRONOS_TASKS,
  IMPORT_KRONOS_TASKS_PENDING,
  IMPORT_KRONOS_TASKS_FULFILLED,
  IMPORT_KRONOS_TASKS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_KRONOS_TASKS:
      return initialState.set('show', true);

    case IMPORT_KRONOS_TASKS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_KRONOS_TASKS:
    case IMPORT_KRONOS_TASKS_FULFILLED:
      return initialState;

    case IMPORT_KRONOS_TASKS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
