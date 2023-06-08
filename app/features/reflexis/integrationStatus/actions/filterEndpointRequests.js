import {fromJS} from 'immutable';

export const FILTER_ENDPOINT_REQUESTS = 'REFLEXIS/INTEGRATION_ENDPOINTS/FILTER_REQUESTS';

export function filterEndpointRequests(filter) {
  return {
    type: FILTER_ENDPOINT_REQUESTS,
    payload: fromJS(filter),
  };
}
