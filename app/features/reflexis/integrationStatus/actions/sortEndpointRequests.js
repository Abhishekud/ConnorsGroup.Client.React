import {fromJS} from 'immutable';

export const SORT_ENDPOINT_REQUESTS = 'REFLEXIS/INTEGRATION_ENDPOINT/SORT_REQUESTS';

export function sortEndpointRequests(sort) {
  return {
    type: SORT_ENDPOINT_REQUESTS,
    payload: fromJS(sort),
  };
}

