import {fromJS} from 'immutable';
import {
  LOAD_INTEGRATION_STATUS_PENDING,
  LOAD_INTEGRATION_STATUS_FULFILLED,
  LOAD_INTEGRATION_STATUS_REJECTED,
  LOAD_STORE_ATTRIBUTES_STATUS_PENDING,
  LOAD_STORE_ATTRIBUTES_STATUS_FULFILLED,
  LOAD_STORE_ATTRIBUTES_STATUS_REJECTED,
  FILTER_STORE_ATTRIBUTES,
  SORT_STORE_ATTRIBUTES,
} from '../../actions';

const initialState = fromJS({
  loading: true,
  sort: [],
  filter: null,
  model: {},
  hideClearFilter: true,
  hideClearSort: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_INTEGRATION_STATUS_PENDING:
      return state.set('loading', true);

    case LOAD_INTEGRATION_STATUS_REJECTED:
      return state.set('loading', false);

    case LOAD_INTEGRATION_STATUS_FULFILLED:
      return state.set('loading', false)
        .set('model', fromJS(action.payload.data));

    case LOAD_STORE_ATTRIBUTES_STATUS_PENDING:
    case LOAD_STORE_ATTRIBUTES_STATUS_FULFILLED:
    case LOAD_STORE_ATTRIBUTES_STATUS_REJECTED:
      return state;

    case FILTER_STORE_ATTRIBUTES:
      return state.set('filter', action.payload);

    case SORT_STORE_ATTRIBUTES:
      return state.set('sort', action.payload);

    default:
      return state;
  }
}
