import {Map} from 'immutable';
import {
  SHOW_IMPORT_KRONOS_LABOR_DRIVERS,
  CANCEL_IMPORT_KRONOS_LABOR_DRIVERS,
  IMPORT_KRONOS_LABOR_DRIVERS_PENDING,
  IMPORT_KRONOS_LABOR_DRIVERS_FULFILLED,
  IMPORT_KRONOS_LABOR_DRIVERS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_KRONOS_LABOR_DRIVERS:
      return initialState.set('show', true);

    case IMPORT_KRONOS_LABOR_DRIVERS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_KRONOS_LABOR_DRIVERS:
    case IMPORT_KRONOS_LABOR_DRIVERS_FULFILLED:
      return initialState;

    case IMPORT_KRONOS_LABOR_DRIVERS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
