import {fromJS} from 'immutable';

export const SORT_LOCATION_REQUESTS = 'REFLEXIS/LOCATION/SORT_REQUESTS';

export function sortLocationRequests(sort) {
  return {
    type: SORT_LOCATION_REQUESTS,
    payload: fromJS(sort),
  };
}

