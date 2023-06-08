import {Map, List, fromJS} from 'immutable';
import {
  GET_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_BY_ORG_OPTION_ID_FULFILLED,
  SORT_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST,
  FILTER_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST,
  CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA,
  CLEAR_LOCATION_DASHBOARD_LABOR_PROJECTIONS_FILTERS,
  CLEAR_LOCATION_DASHBOARD_LABOR_PROJECTIONS_SORTS,
  GET_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_BY_ORG_OPTION_ID_PENDING,
  GET_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_BY_ORG_OPTION_ID_REJECTED,
} from '../../actions';

const initialState = Map({
  sort: new List(),
  filter: null,
  listEntryModels: List(),
  levelOptionName: '',
  isGridDataLoading: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_BY_ORG_OPTION_ID_PENDING:
      return state.set('isGridDataLoading', true);

    case GET_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_BY_ORG_OPTION_ID_FULFILLED: {
      const {listEntryModels, levelOptionName} = action.payload.data;

      return state.withMutations(map =>
        map.set('levelOptionName', levelOptionName)
          .set('listEntryModels', fromJS(listEntryModels))
          .set('isGridDataLoading', false));
    }

    case GET_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_BY_ORG_OPTION_ID_REJECTED:
      return state.set('isGridDataLoading', false);

    case CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA:
      return initialState;

    case CLEAR_LOCATION_DASHBOARD_LABOR_PROJECTIONS_FILTERS:
      return state.set('filter', initialState.get('filter'));

    case CLEAR_LOCATION_DASHBOARD_LABOR_PROJECTIONS_SORTS:
      return state.set('sort', initialState.get('sort'));

    case SORT_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST:
      return state.set('sort', action.payload);

    case FILTER_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST: {
      return state.set('filter', action.payload);
    }

    default:
      return state;
  }
}
