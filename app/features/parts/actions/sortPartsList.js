import {fromJS} from 'immutable';

export const SORT_PARTS_LIST = 'SORT_PARTS_LIST';

export function sortPartsList(sort) {
  return {
    type: SORT_PARTS_LIST,
    payload: fromJS(sort),
  };
}
