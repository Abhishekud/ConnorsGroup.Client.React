import {Map} from 'immutable';
import {
  SHOW_IMPORT_REFLEXIS_LABOR_STANDARDS_MODAL,
  CANCEL_IMPORT_REFLEXIS_LABOR_STANDARDS,
  IMPORT_REFLEXIS_LABOR_STANDARDS_PENDING,
  IMPORT_REFLEXIS_LABOR_STANDARDS_FULFILLED,
  IMPORT_REFLEXIS_LABOR_STANDARDS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_REFLEXIS_LABOR_STANDARDS_MODAL:
      return initialState.set('show', true);

    case IMPORT_REFLEXIS_LABOR_STANDARDS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_REFLEXIS_LABOR_STANDARDS:
    case IMPORT_REFLEXIS_LABOR_STANDARDS_FULFILLED:
      return initialState;

    case IMPORT_REFLEXIS_LABOR_STANDARDS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}


