import {fromJS} from 'immutable';

export const SORT_ATTRIBUTES_LIST = 'SORT_ATTRIBUTES_LIST';

export function sortAttributesList(sort) {
  return {
    type: SORT_ATTRIBUTES_LIST,
    payload: fromJS(sort),
  };
}
