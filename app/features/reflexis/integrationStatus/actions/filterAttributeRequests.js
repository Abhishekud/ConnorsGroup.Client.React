import {fromJS} from 'immutable';

export const FILTER_ATTRIBUTE_REQUESTS = 'REFLEXIS/ATTRIBUTES/FILTER_REQUESTS';

export function filterAttributeRequests(filter) {
  return {
    type: FILTER_ATTRIBUTE_REQUESTS,
    payload: fromJS(filter),
  };
}
