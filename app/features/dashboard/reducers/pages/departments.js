import {Map, List, fromJS} from 'immutable';
import {
  GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_FULFILLED,
  SORT_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST,
  FILTER_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST,
  GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_PENDING,
  CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA,
  CLEAR_DEPARTMENT_DASHBOARD_LABOR_PROJECTIONS_FILTERS,
  CLEAR_DEPARTMENT_DASHBOARD_LABOR_PROJECTIONS_SORTS,
  GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_REJECTED,
} from '../../actions';

const initialState = Map({
  sort: new List(),
  filter: null,
  listEntryModels: List(),
  treemapEntryModels: List(),
  isGridDataLoading: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_FULFILLED: {
      const {listEntryModels, treemapEntryModels} = action.payload.data;

      return state.withMutations(map =>
        map.set('listEntryModels', fromJS(listEntryModels))
          .set('treemapEntryModels', fromJS(treemapEntryModels))
          .set('isGridDataLoading', false));
    }

    case CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA:
      return initialState;

    case GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_PENDING: {
      return state.withMutations(map =>
        map.set('listEntryModels', List())
          .set('treemapEntryModels', List())
          .set('isGridDataLoading', true));
    }
    case GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_REJECTED: {
      return state.set('isGridDataLoading', false);
    }

    case SORT_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST:
      return state.set('sort', action.payload);

    case FILTER_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST:
      return state.set('filter', action.payload);

    case CLEAR_DEPARTMENT_DASHBOARD_LABOR_PROJECTIONS_FILTERS:
      return state.set('filter', initialState.get('filter'));

    case CLEAR_DEPARTMENT_DASHBOARD_LABOR_PROJECTIONS_SORTS:
      return state.set('sort', initialState.get('sort'));

    default:
      return state;
  }
}
