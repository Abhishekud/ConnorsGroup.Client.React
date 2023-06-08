import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS} from 'immutable';
import {DefaultTableCell, DefaultTableNumericCell, DefaultTableHeaderCell} from '../../../customizableGrid/components';
import {
  LOAD_ELEMENT_ACTIVITIES_LIST_PENDING,
  LOAD_ELEMENT_ACTIVITIES_LIST_FULFILLED,
  LOAD_ELEMENT_ACTIVITIES_LIST_REJECTED,
  SORT_ELEMENT_ACTIVITIES_LIST,
  FILTER_ELEMENT_ACTIVITIES_LIST,
  CREATE_ELEMENT_ACTIVITY_FULFILLED,
  DELETE_ELEMENT_ACTIVITY_FULFILLED,
  UPDATE_ELEMENT_ACTIVITY_FULFILLED,
  SELECT_ELEMENT_ACTIVITY,
  CLEAR_SELECTED_ELEMENT_ACTIVITY,
  CLOSE_ELEMENT_ACTIVITIES_LIST_EDIT_SIDEBAR,
} from '../../actions';

const initialState = fromJS({
  loading: false,
  activities: Map(),
  sort: [{field: 'name', dir: 'asc'}],
  filter: null,
  columns:
      [{
        field: 'name',
        title: 'Name',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      }, {
        field: 'elementsCount',
        title: 'Elements Count',
        filterable: true,
        sortable: true,
        filter: 'numeric',
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableNumericCell,
      }],

  selectedActivityId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ELEMENT_ACTIVITIES_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_ELEMENT_ACTIVITIES_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('activities', modelsArrayToMapById(action.payload.data))
          .set('selectedActivityId', null));

    case LOAD_ELEMENT_ACTIVITIES_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_ELEMENT_ACTIVITY_FULFILLED:
    case UPDATE_ELEMENT_ACTIVITY_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['activities', data.id], fromJS(data));
    }

    case DELETE_ELEMENT_ACTIVITY_FULFILLED:
      return state.deleteIn(['activities', action.payload.data]);

    case SORT_ELEMENT_ACTIVITIES_LIST: {
      return state.set('sort', action.payload);
    }

    case FILTER_ELEMENT_ACTIVITIES_LIST: {
      return state.set('filter', action.payload);
    }

    case SELECT_ELEMENT_ACTIVITY: {
      return state.set('selectedActivityId', action.payload.get('id'));
    }

    case CLEAR_SELECTED_ELEMENT_ACTIVITY:
    case CLOSE_ELEMENT_ACTIVITIES_LIST_EDIT_SIDEBAR:
      return state.set('selectedActivityId', null);

    default:
      return state;
  }
}
