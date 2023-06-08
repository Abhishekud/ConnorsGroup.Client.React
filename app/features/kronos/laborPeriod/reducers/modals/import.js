import {Map} from 'immutable';
import {
  SHOW_IMPORT_LABOR_PERIODS,
  CANCEL_IMPORT_LABOR_PERIODS,
  IMPORT_LABOR_PERIODS_PENDING,
  IMPORT_LABOR_PERIODS_FULFILLED,
  IMPORT_LABOR_PERIODS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_LABOR_PERIODS:
      return initialState.set('show', true);

    case IMPORT_LABOR_PERIODS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_LABOR_PERIODS:
    case IMPORT_LABOR_PERIODS_FULFILLED:
      return initialState;

    case IMPORT_LABOR_PERIODS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
