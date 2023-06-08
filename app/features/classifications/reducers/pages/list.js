import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS} from 'immutable';
import {
  LOAD_CLASSIFICATIONS_LIST_PENDING,
  LOAD_CLASSIFICATIONS_LIST_FULFILLED,
  LOAD_CLASSIFICATIONS_LIST_REJECTED,
  SORT_CLASSIFICATIONS_LIST,
  CREATE_CLASSIFICATION_FULFILLED,
  DELETE_CLASSIFICATION_FULFILLED,
  UPDATE_CLASSIFICATION_FULFILLED,
  SELECT_CLASSIFICATION,
  CLEAR_SELECTED_CLASSIFICATION,
  CLOSE_CLASSIFICATIONS_LIST_EDIT_SIDEBAR,
  FILTER_CLASSIFICATIONS_LIST,
} from '../../actions';

const initialState = Map({
  loading: false,
  classifications: Map(),
  sort: [{
    field: 'name',
    dir: 'asc',
  }],
  filter: null,
  selectedClassificationId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CLASSIFICATIONS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_CLASSIFICATIONS_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('classifications', modelsArrayToMapById(action.payload.data))
          .set('selectedClassificationId', null));

    case LOAD_CLASSIFICATIONS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_CLASSIFICATION_FULFILLED:
    case UPDATE_CLASSIFICATION_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['classifications', data.id], fromJS(data));
    }

    case DELETE_CLASSIFICATION_FULFILLED:
      return state.deleteIn(['classifications', action.payload.data]);

    case SORT_CLASSIFICATIONS_LIST:
      return state.set('sort', action.payload);

    case FILTER_CLASSIFICATIONS_LIST:
      return state.set('filter', action.payload);

    case SELECT_CLASSIFICATION:
      return state.withMutations(m =>
        m.set('selectedClassificationId', action.payload.get('id'))
          .deleteIn(['classifications', state.get('selectedClassificationId'), 'selected'])
          .setIn(['classifications', action.payload.get('id'), 'selected'], true)
      );

    case CLEAR_SELECTED_CLASSIFICATION:
    case CLOSE_CLASSIFICATIONS_LIST_EDIT_SIDEBAR: {
      return state.withMutations(m =>
        m.set('selectedClassificationId', null)
          .deleteIn(['classifications', state.get('selectedClassificationId'), 'selected'])
      );
    }

    default:
      return state;
  }
}
