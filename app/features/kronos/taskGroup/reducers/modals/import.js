import {Map} from 'immutable';
import {
  SHOW_IMPORT_KRONOS_TASK_GROUPS,
  CANCEL_IMPORT_KRONOS_TASK_GROUPS,
  IMPORT_KRONOS_TASK_GROUPS_PENDING,
  IMPORT_KRONOS_TASK_GROUPS_FULFILLED,
  IMPORT_KRONOS_TASK_GROUPS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_KRONOS_TASK_GROUPS:
      return initialState.set('show', true);

    case IMPORT_KRONOS_TASK_GROUPS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_KRONOS_TASK_GROUPS:
    case IMPORT_KRONOS_TASK_GROUPS_FULFILLED:
      return initialState;

    case IMPORT_KRONOS_TASK_GROUPS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
