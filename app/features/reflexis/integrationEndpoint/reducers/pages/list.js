import {fromJS} from 'immutable';
import {
  LOAD_INTEGRATION_ENDPOINTS_FULFILLED,
  LOAD_INTEGRATION_ENDPOINTS_PENDING,
  LOAD_INTEGRATION_ENDPOINTS_REJECTED,
  SORT_ENDPOINTS,
  FILTER_ENDPOINTS,
  OPEN_ENDPOINT_EDIT_SIDEBAR_PENDING,
  CANCEL_ENDPOINT_EDIT,
} from '../../actions';

const initialState = fromJS({
  endpoints: [],
  loading: false,
  filter: null,
  sort: [],
  numberOfSidebarsOpen: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_INTEGRATION_ENDPOINTS_PENDING:
      return state.set('loading', true);

    case LOAD_INTEGRATION_ENDPOINTS_REJECTED:
      return state.set('loading', false);

    case LOAD_INTEGRATION_ENDPOINTS_FULFILLED: {
      if (action.payload.status === 200) {
        return state
          .set('loading', false)
          .set('endpoints', fromJS(action.payload.data.endpoints));
      }

      return state.set('loading', false);
    }

    case OPEN_ENDPOINT_EDIT_SIDEBAR_PENDING:
      return state.update('numberOfSidebarsOpen', n => n + 1);

    case CANCEL_ENDPOINT_EDIT:
      return state.update('numberOfSidebarsOpen', n => n - 1);

    case SORT_ENDPOINTS:
      return state.set('sort', action.payload);

    case FILTER_ENDPOINTS:
      return state.set('filter', action.payload);

    default:
      return state;
  }
}
