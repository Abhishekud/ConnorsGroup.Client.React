import {fromJS} from 'immutable';
import {
  FILTER_LOCATION_REQUESTS,
  CLEAR_LOCATION_REQUESTS_FILTER,
  SORT_LOCATION_REQUESTS,
  CLEAR_LOCATION_REQUESTS_SORT,
  LOAD_LOCATION_REQUESTS_PENDING,
  LOAD_LOCATION_REQUESTS_FULFILLED,
  LOAD_LOCATION_REQUESTS_REJECTED,
} from '../../actions';

const initialState = fromJS({
  loading: false,
  sort: [],
  filter: null,
  location: {
    name: null,
    requests: [],
  },
  hideClearFilter: true,
  hideClearSort: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_LOCATION_REQUESTS_PENDING:
      return state.set('loading', true);

    case LOAD_LOCATION_REQUESTS_REJECTED:
      return state.set('loading', false);

    case LOAD_LOCATION_REQUESTS_FULFILLED:
      return state.set('loading', false)
        .set('location', fromJS(action.payload.data));

    case FILTER_LOCATION_REQUESTS:
      return state.set('filter', action.payload);

    case CLEAR_LOCATION_REQUESTS_FILTER:
      return state.set('filter', initialState.get('filter'));

    case SORT_LOCATION_REQUESTS:
      return state.set('sort', action.payload);

    case CLEAR_LOCATION_REQUESTS_SORT:
      return state.set('sort', initialState.get('sort'));

    default:
      return state;
  }
}

