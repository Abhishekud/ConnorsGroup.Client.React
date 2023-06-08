import {fromJS} from 'immutable';
import {
  FILTER_ENDPOINT_REQUESTS,
  CLEAR_ENDPOINT_REQUESTS_FILTER,
  SORT_ENDPOINT_REQUESTS,
  CLEAR_ENDPOINT_REQUESTS_SORT,
  LOAD_INTEGRATION_ENDPOINT_REQUESTS_PENDING,
  LOAD_INTEGRATION_ENDPOINT_REQUESTS_FULFILLED,
  LOAD_INTEGRATION_ENDPOINT_REQUESTS_REJECTED,
} from '../../actions';

const initialState = fromJS({
  loading: false,
  sort: [],
  filter: null,
  endpoint: {
    name: null,
    requests: [],
  },
  hideClearFilter: true,
  hideClearSort: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_INTEGRATION_ENDPOINT_REQUESTS_PENDING:
      return state.set('loading', true);

    case LOAD_INTEGRATION_ENDPOINT_REQUESTS_REJECTED:
      return state.set('loading', false);

    case LOAD_INTEGRATION_ENDPOINT_REQUESTS_FULFILLED:
      return state.set('loading', false)
        .set('endpoint', fromJS(action.payload.data));

    case FILTER_ENDPOINT_REQUESTS:
      return state.set('filter', action.payload);

    case CLEAR_ENDPOINT_REQUESTS_FILTER:
      return state.set('filter', initialState.get('filter'));

    case SORT_ENDPOINT_REQUESTS:
      return state.set('sort', action.payload);

    case CLEAR_ENDPOINT_REQUESTS_SORT:
      return state.set('sort', initialState.get('sort'));

    default:
      return state;
  }
}
