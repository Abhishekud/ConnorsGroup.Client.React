import {Map, List, fromJS} from 'immutable';
import {
  GET_DASHBOARD_LABOR_PROJECTIONS_TOP_LEVEL_FULFILLED,
  GET_DASHBOARD_LABOR_PROJECTIONS_SUB_LEVEL_FULFILLED,
  SORT_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST,
  CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA,
  FILTER_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST,
} from '../../actions';

const initialState = Map({
  sort: new List(),
  filter: new Map(),
  listEntryModels: List(),
  levelOptionName: '',
  levelName: '',
});

export default function (state = initialState, action) {
  switch (action.type) {

    case CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA:
      return initialState;

    case GET_DASHBOARD_LABOR_PROJECTIONS_TOP_LEVEL_FULFILLED:
    case GET_DASHBOARD_LABOR_PROJECTIONS_SUB_LEVEL_FULFILLED: {
      const {listEntryModels, orgHierarchyLevel, levelOptionName} = action.payload.data;

      return state.withMutations(map =>
        map.set('levelOptionName', levelOptionName)
          .set('levelName', orgHierarchyLevel.name)
          .set('levelNumber', orgHierarchyLevel.number)
          .set('listEntryModels', fromJS(listEntryModels)));
    }

    case SORT_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST: {
      return state.setIn(['sort', state.get('levelNumber')], action.payload);
    }

    case FILTER_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST: {
      return state.setIn(['filter', state.get('levelNumber')], action.payload);
    }

    default:
      return state;
  }
}
