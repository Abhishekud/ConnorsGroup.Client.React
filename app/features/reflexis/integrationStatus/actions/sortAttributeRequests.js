import {fromJS} from 'immutable';

export const SORT_ATTRIBUTE_REQUESTS = 'REFLEXIS/ATTRIBUTE/SORT_REQUESTS';

export function sortAttributeRequests(sort) {
  return {
    type: SORT_ATTRIBUTE_REQUESTS,
    payload: fromJS(sort),
  };
}

