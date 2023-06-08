import {fromJS} from 'immutable';
import {
  CANCEL_BULK_EDIT_LABOR_STANDARDS,
  SHOW_BULK_EDIT_LABOR_STANDARDS_SIDEBAR,
  SELECT_LABOR_STANDARD,
  BULK_UPDATE_LABOR_STANDARDS_FULFILLED,
  TOGGLE_SELECT_ALL_LABOR_STANDARDS,
  FILTER_LABOR_STANDARDS,
  SORT_LABOR_STANDARDS,
} from '../../actions';

const initialState = fromJS({
  columns: [],
  filter: null,
  sort: null,
  numberOfSidebarsOpen: 0,
  selected: {},
  allSelected: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case (SHOW_BULK_EDIT_LABOR_STANDARDS_SIDEBAR):
      return state.update('numberOfSidebarsOpen', i => i + 1);

    case (CANCEL_BULK_EDIT_LABOR_STANDARDS):
    case (BULK_UPDATE_LABOR_STANDARDS_FULFILLED):
      return state.update('numberOfSidebarsOpen', i => i - 1);

    case (SELECT_LABOR_STANDARD): {
      if (state.get('allSelected') !== true) {
        return state.hasIn(['selected', action.payload.id]) ? state.deleteIn(['selected', action.payload.id]) : state.setIn(['selected', action.payload.id], true);
      }
      return state;
    }

    case (TOGGLE_SELECT_ALL_LABOR_STANDARDS):
      return state.set('selected', initialState.get('selected'))
        .update('allSelected', s => !s);

    case (FILTER_LABOR_STANDARDS):
      return state.withMutations(map => {
        map.set('filter', action.payload);
        map.set('selected', initialState.get('selected'));
        map.set('allSelected', false);
      });

    case (SORT_LABOR_STANDARDS):
      return state.set('sort', action.payload);

    default:
      return state;
  }
}
