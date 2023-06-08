import {fromJS} from 'immutable';

export const FILTER_LOCATION_REQUESTS = 'REFLEXIS/LOCATIONS/FILTER_REQUESTS';

export function filterLocationRequests(filter) {
  return {
    type: FILTER_LOCATION_REQUESTS,
    payload: fromJS(filter),
  };
}
