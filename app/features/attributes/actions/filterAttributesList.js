import {fromJS} from 'immutable';

export const FILTER_ATTRIBUTES_LIST = 'FILTER_ATTRIBUTES_LIST';

export function filterAttributesList(filter) {
  return {
    type: FILTER_ATTRIBUTES_LIST,
    payload: fromJS(filter),
  };
}
