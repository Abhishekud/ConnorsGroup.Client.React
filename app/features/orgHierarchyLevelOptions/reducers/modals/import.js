import {Map} from 'immutable';
import {
  SHOW_IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS,
  CANCEL_IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS,
  IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS_PENDING,
  IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS_FULFILLED,
  IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  importing: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS:
      return initialState.set('show', true);

    case IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS_PENDING:
      return state.set('importing', true);

    case CANCEL_IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS:
    case IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS_FULFILLED:
      return initialState;

    case IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS_REJECTED:
      return state.set('importing', false);

    default:
      return state;
  }
}
