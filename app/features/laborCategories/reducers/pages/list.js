import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS} from 'immutable';
import {
  LOAD_LABOR_CATEGORIES_LIST_PENDING,
  LOAD_LABOR_CATEGORIES_LIST_FULFILLED,
  LOAD_LABOR_CATEGORIES_LIST_REJECTED,
  SORT_LABOR_CATEGORIES_LIST,
  CREATE_LABOR_CATEGORY_FULFILLED,
  DELETE_LABOR_CATEGORY_FULFILLED,
  UPDATE_LABOR_CATEGORY_FULFILLED,
  SELECT_LABOR_CATEGORY,
  CLEAR_SELECTED_LABOR_CATEGORY,
  CLOSE_LABOR_CATEGORIES_LIST_EDIT_SIDEBAR,
  FILTER_LABOR_CATEGORIES_LIST,
} from '../../actions';

const initialState = Map({
  loading: false,
  laborCategories: Map(),
  sort: [{field: 'name', dir: 'asc'}],
  filter: null,
  selectedLaborCategoryId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_LABOR_CATEGORIES_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_LABOR_CATEGORIES_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('laborCategories', modelsArrayToMapById(action.payload.data))
          .set('selectedLaborCategoryId', null));

    case LOAD_LABOR_CATEGORIES_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_LABOR_CATEGORY_FULFILLED:
    case UPDATE_LABOR_CATEGORY_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['laborCategories', data.id], fromJS(data));
    }

    case DELETE_LABOR_CATEGORY_FULFILLED:
      return state.deleteIn(['laborCategories', action.payload.data]);

    case SORT_LABOR_CATEGORIES_LIST:
      return state.set('sort', action.payload);

    case FILTER_LABOR_CATEGORIES_LIST:
      return state.set('filter', action.payload);

    case SELECT_LABOR_CATEGORY:
      return state.set('selectedLaborCategoryId', action.payload.get('id'));

    case CLEAR_SELECTED_LABOR_CATEGORY:
    case CLOSE_LABOR_CATEGORIES_LIST_EDIT_SIDEBAR:
      return state.set('selectedLaborCategoryId', null);

    default:
      return state;
  }
}
