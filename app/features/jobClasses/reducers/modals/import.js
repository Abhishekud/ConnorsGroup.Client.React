import {Map} from 'immutable';
import {
  TOGGLE_IMPORT_JOB_CLASSES,
  IMPORT_JOB_CLASSES_PENDING,
  IMPORT_JOB_CLASSES_FULFILLED,
  IMPORT_JOB_CLASSES_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_IMPORT_JOB_CLASSES:
      return state.update('show', show => !show);

    case IMPORT_JOB_CLASSES_PENDING:
      return state.set('importing', true);

    case IMPORT_JOB_CLASSES_FULFILLED:
      return initialState;

    case IMPORT_JOB_CLASSES_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
