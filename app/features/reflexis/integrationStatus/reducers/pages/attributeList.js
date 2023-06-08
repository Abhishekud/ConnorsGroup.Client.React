import {fromJS} from 'immutable';
import {
  FILTER_ATTRIBUTE_REQUESTS,
  CLEAR_ATTRIBUTE_REQUESTS_FILTER,
  SORT_ATTRIBUTE_REQUESTS,
  CLEAR_ATTRIBUTE_REQUESTS_SORT,
  LOAD_ATTRIBUTE_REQUESTS_PENDING,
  LOAD_ATTRIBUTE_REQUESTS_FULFILLED,
  LOAD_ATTRIBUTE_REQUESTS_REJECTED,
} from '../../actions';

const initialState = fromJS({
  loading: false,
  sort: [],
  filter: null,
  attribute: {
    name: null,
    requests: [],
  },
  hideClearFilter: true,
  hideClearSort: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ATTRIBUTE_REQUESTS_PENDING:
      return state.set('loading', true);

    case LOAD_ATTRIBUTE_REQUESTS_REJECTED:
      return state.set('loading', false);

    case LOAD_ATTRIBUTE_REQUESTS_FULFILLED:
      return state.set('loading', false)
        .set('attribute', fromJS(action.payload.data));

    case FILTER_ATTRIBUTE_REQUESTS:
      return state.set('filter', action.payload);

    case CLEAR_ATTRIBUTE_REQUESTS_FILTER:
      return state.set('filter', initialState.get('filter'));

    case SORT_ATTRIBUTE_REQUESTS:
      return state.set('sort', action.payload);

    case CLEAR_ATTRIBUTE_REQUESTS_SORT:
      return state.set('sort', initialState.get('sort'));

    default:
      return state;
  }
}
