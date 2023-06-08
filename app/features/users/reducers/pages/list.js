import {modelsArrayToMapById} from '../../../shared/services';
import {
  CREATE_USER_FULFILLED,
  DELETE_USER_FULFILLED,
  LOAD_USERS_LIST_PENDING,
  LOAD_USERS_LIST_FULFILLED,
  LOAD_USERS_LIST_REJECTED,
  UPDATE_USER_FULFILLED,
  SORT_USERS_LIST,
  FILTER_USERS_LIST,
  SELECT_USER,
  CLEAR_SELECTED_USER,
  CLOSE_USERS_LIST_EDIT_SIDEBAR,
  CLEAR_USERS_LIST_FILTERS,
  CLEAR_USERS_LIST_SORTS,
} from '../../actions';
import {fromJS, Map, List} from 'immutable';
import {DateTimeCell} from '../../../customizableGrid/components';
import {UserStatusFilterCell} from '../../components';

const initialState = Map({
  loading: false,
  users: Map(),
  sort: new List(),
  filter: null,
  selectedUserId: null,
  columns: fromJS([{
    width: 400,
    field: 'email',
    title: 'Email',
    filterable: true,
    sortable: true,
  }, {
    field: 'roleInstring',
    title: 'Roles',
    filterable: true,
    sortable: true,
  }, {
    field: 'status',
    title: 'Status',
    width: 150,
    filterable: true,
    sortable: true,
    filterCell: UserStatusFilterCell,
  }, {
    field: 'lastLoginDate',
    title: 'Last Log In (MM/DD/YYYY)',
    filterable: false,
    sortable: true,
    cell: DateTimeCell,
  }]),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_USERS_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('users', modelsArrayToMapById(action.payload.data))
          .set('selectedUserId', null));

    case LOAD_USERS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_USER_FULFILLED:
    case UPDATE_USER_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['users', data.id], fromJS(data));
    }

    case DELETE_USER_FULFILLED:
      return state.deleteIn(['users', action.payload.data]);

    case SORT_USERS_LIST:
      return state.set('sort', action.payload);

    case FILTER_USERS_LIST:
      return state.set('filter', action.payload);

    case SELECT_USER:
      return state.set('selectedUserId', action.payload.get('id'));

    case CLEAR_SELECTED_USER:
    case CLOSE_USERS_LIST_EDIT_SIDEBAR:
      return state.set('selectedUserId', null);

    case CLEAR_USERS_LIST_FILTERS:
      return state.set('filter', initialState.get('filter'));

    case CLEAR_USERS_LIST_SORTS:
      return state.set('sort', initialState.get('sort'));

    default:
      return state;
  }
}
