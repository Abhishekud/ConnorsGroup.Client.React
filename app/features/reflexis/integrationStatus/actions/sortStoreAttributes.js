import {fromJS} from 'immutable';

export const SORT_STORE_ATTRIBUTES = 'REFLEXIS/INTEGRATION_STATUS/SORT_STORE_ATTRIBUTES';

export function sortStoreAttributes(sort) {
  return {
    type: SORT_STORE_ATTRIBUTES,
    payload: fromJS(sort),
  };
}

