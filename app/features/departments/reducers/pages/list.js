import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS} from 'immutable';
import {
  LOAD_DEPARTMENTS_LIST_PENDING,
  LOAD_DEPARTMENTS_LIST_FULFILLED,
  LOAD_DEPARTMENTS_LIST_REJECTED,
  SORT_DEPARTMENTS_LIST,
  FILTER_DEPARTMENTS_LIST,
  CREATE_DEPARTMENT_FULFILLED,
  DELETE_DEPARTMENT_FULFILLED,
  UPDATE_DEPARTMENT_FULFILLED,
  SELECT_DEPARTMENT,
  CLEAR_SELECTED_DEPARTMENT,
  CLOSE_DEPARTMENTS_LIST_EDIT_SIDEBAR,
} from '../../actions';

const initialState = Map({
  loading: false,
  departments: Map(),
  sort: [{
    field: 'name',
    dir: 'asc',
  }],
  filter: null,
  selectedDepartmentId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_DEPARTMENTS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_DEPARTMENTS_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('departments', modelsArrayToMapById(action.payload.data))
          .set('selectedDepartmentId', null));

    case LOAD_DEPARTMENTS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_DEPARTMENT_FULFILLED:
    case UPDATE_DEPARTMENT_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['departments', data.id], fromJS(data));
    }

    case DELETE_DEPARTMENT_FULFILLED:
      return state.deleteIn(['departments', action.payload.data]);

    case SORT_DEPARTMENTS_LIST:
      return state.set('sort', action.payload);

    case FILTER_DEPARTMENTS_LIST:
      return state.set('filter', action.payload);

    case SELECT_DEPARTMENT:
      return state.withMutations(m =>
        m.set('selectedDepartmentId', action.payload.get('id'))
          .deleteIn(['departments', state.get('selectedDepartmentId'), 'selected'])
          .setIn(['departments', action.payload.get('id'), 'selected'], true)
      );

    case CLEAR_SELECTED_DEPARTMENT:
    case CLOSE_DEPARTMENTS_LIST_EDIT_SIDEBAR:
      return state.withMutations(m =>
        m.set('selectedDepartmentId', null)
          .deleteIn(['departments', state.get('selectedDepartmentId'), 'selected'])
      );

    default:
      return state;
  }
}
