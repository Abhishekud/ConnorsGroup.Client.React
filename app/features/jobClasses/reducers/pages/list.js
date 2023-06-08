import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS} from 'immutable';
import {
  LOAD_JOB_CLASSES_LIST_PENDING,
  LOAD_JOB_CLASSES_LIST_FULFILLED,
  LOAD_JOB_CLASSES_LIST_REJECTED,
  SORT_JOB_CLASSES_LIST,
  CREATE_JOB_CLASS_FULFILLED,
  DELETE_JOB_CLASS_FULFILLED,
  UPDATE_JOB_CLASS_FULFILLED,
  SELECT_JOB_CLASS,
  CLEAR_SELECTED_JOB_CLASS,
  CLOSE_JOB_CLASSES_LIST_EDIT_SIDEBAR,
  FILTER_JOB_CLASSES_LIST,
} from '../../actions';

const initialState = Map({
  loading: false,
  jobClasses: Map(),
  sort: [{field: 'name', dir: 'asc'}],
  filter: null,
  selectedJobClassId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_JOB_CLASSES_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_JOB_CLASSES_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('jobClasses', modelsArrayToMapById(action.payload.data))
          .set('selectedJobClassId', null));

    case LOAD_JOB_CLASSES_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_JOB_CLASS_FULFILLED:
    case UPDATE_JOB_CLASS_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['jobClasses', data.id], fromJS(data));
    }

    case DELETE_JOB_CLASS_FULFILLED:
      return state.deleteIn(['jobClasses', action.payload.data]);

    case SORT_JOB_CLASSES_LIST:
      return state.set('sort', action.payload);

    case FILTER_JOB_CLASSES_LIST:
      return state.set('filter', action.payload);

    case SELECT_JOB_CLASS:
      return state.withMutations(m =>
        m.set('selectedJobClassId', action.payload.get('id'))
          .deleteIn(['jobClasses', state.get('selectedJobClassId'), 'selected'])
          .setIn(['jobClasses', action.payload.get('id'), 'selected'], true)
      );

    case CLEAR_SELECTED_JOB_CLASS:
    case CLOSE_JOB_CLASSES_LIST_EDIT_SIDEBAR:
      return state.withMutations(m =>
        m.set('selectedJobClassId', null)
          .deleteIn(['jobClasses', state.get('selectedJobClassId'), 'selected'])
      );

    default:
      return state;
  }
}
