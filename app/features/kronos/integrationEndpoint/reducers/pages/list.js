import {fromJS, List} from 'immutable';
import {
  CREATE_KRONOS_ENDPOINT_FULFILLED,
  UPDATE_KRONOS_ENDPOINT_FULFILLED,
  CANCEL_EDIT,
  SELECT_ENDPOINT,
  SORT_ENDPOINTS,
  FILTER_ENDPOINTS,
  DELETE_KRONOS_ENDPOINT_FULFILLED,
  LOAD_ENDPOINTS_LIST_FULFILLED,
  CREATE_KRONOS_WFD_ENDPOINT_FULFILLED,
} from '../../actions';

const initialState = fromJS({
  integrationEndpoints: [],
  selectedEndpoint: null,
  sort: new List(),
  filter: null,
  loading: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ENDPOINTS_LIST_FULFILLED: {
      if (action.payload.status === 200) {
        return state.set('loading', false).set('integrationEndpoints', fromJS(action.payload.data));
      }
      return state.set('loading', false);
    }
    case CREATE_KRONOS_ENDPOINT_FULFILLED:
    case CREATE_KRONOS_WFD_ENDPOINT_FULFILLED:
    {
      if (action.payload.status === 200) {
        return state.withMutations(map =>
          map.update('integrationEndpoints', lds => lds.push(fromJS(action.payload.data)))
            .set('selectedEndpoint', fromJS(action.payload.data))
        );
      }
      return state;
    }
    case DELETE_KRONOS_ENDPOINT_FULFILLED: {
      const index = state.get('integrationEndpoints').findIndex(d => d.get('id') === action.payload.config.data.id);
      return state.deleteIn(['integrationEndpoints', index]).set('selectedEndpoint', null);
    }
    case SELECT_ENDPOINT:
      return state.set('selectedEndpoint', action.payload);
    case CANCEL_EDIT:
      return state.set('selectedEndpoint', null);

    case UPDATE_KRONOS_ENDPOINT_FULFILLED: {
      const index = state.get('integrationEndpoints').findIndex(d => d.get('id') === action.payload.data.id);
      return state.withMutations(map =>
        map.setIn(['integrationEndpoints', index], fromJS(action.payload.data))
          .set('selectedEndpoint', null));
    }
    case SORT_ENDPOINTS:
      return state.set('sort', action.payload);
    case FILTER_ENDPOINTS:
      return state.set('filter', action.payload);
  }
  return state;
}
