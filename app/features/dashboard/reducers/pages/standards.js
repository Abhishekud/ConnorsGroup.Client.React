import {Map, List, fromJS} from 'immutable';
import {
  GET_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_FULFILLED,
  SORT_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST,
  GET_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_PENDING,
  FILTER_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST,
  CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA,
  CLEAR_STANDARD_DASHBOARD_LABOR_PROJECTIONS_FILTERS,
  CLEAR_STANDARD_DASHBOARD_LABOR_PROJECTIONS_SORTS,
  GET_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_REJECTED,
} from '../../actions';
import {DefaultTableHeaderCell, DefaultTableCell, FourDecimalNumericCell} from '../../../customizableGrid/components';

const initialState = Map({
  sort: new List(),
  filter: null,
  listEntryModels: List(),
  treemapEntryModels: List(),
  column: fromJS([{
    field: 'name',
    title: 'STANDARD',
    filterable: true,
    sortable: true,
    headerCell: DefaultTableHeaderCell,
    cell: DefaultTableCell,
  },
  {
    field: 'laborHours',
    title: 'LABOR HOURS',
    filterable: true,
    sortable: true,
    headerCell: DefaultTableHeaderCell,
    cell: FourDecimalNumericCell,
  }]),
  isGridDataLoading: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_FULFILLED: {
      const {listEntryModels, treemapEntryModels} = action.payload.data;

      return state.withMutations(map =>
        map.set('listEntryModels', fromJS(listEntryModels))
          .set('treemapEntryModels', fromJS(treemapEntryModels))
          .set('isGridDataLoading', false));
    }

    case CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA:
      return initialState;

    case GET_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_PENDING: {
      return state.withMutations(map =>
        map.set('listEntryModels', List())
          .set('treemapEntryModels', List())
          .set('isGridDataLoading', true));
    }

    case GET_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_REJECTED:
      return state.set('isGridDataLoading', false);

    case SORT_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST:
      return state.set('sort', action.payload);

    case FILTER_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST:
      return state.set('filter', action.payload);

    case CLEAR_STANDARD_DASHBOARD_LABOR_PROJECTIONS_FILTERS:
      return state.set('filter', initialState.get('filter'));

    case CLEAR_STANDARD_DASHBOARD_LABOR_PROJECTIONS_SORTS:
      return state.set('sort', initialState.get('sort'));

    default:
      return state;
  }
}
