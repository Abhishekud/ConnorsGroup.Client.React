import {Map} from 'immutable';
import {
  TOGGLE_IMPORT_LABOR_CATEGORIES,
  IMPORT_LABOR_CATEGORIES_PENDING,
  IMPORT_LABOR_CATEGORIES_FULFILLED,
  IMPORT_LABOR_CATEGORIES_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_IMPORT_LABOR_CATEGORIES:
      return state.update('show', show => !show);

    case IMPORT_LABOR_CATEGORIES_PENDING:
      return state.set('importing', true);

    case IMPORT_LABOR_CATEGORIES_FULFILLED:
      return initialState;

    case IMPORT_LABOR_CATEGORIES_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
