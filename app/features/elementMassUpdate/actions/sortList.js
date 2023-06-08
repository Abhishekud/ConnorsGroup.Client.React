import {fromJS} from 'immutable';
export const SORT_ELEMENT_WHERE_USED_STANDARDS_LIST = 'SORT_ELEMENT_WHERE_USED_STANDARDS_LIST';

export function sortList(sort) {
  return {
    type: SORT_ELEMENT_WHERE_USED_STANDARDS_LIST,
    payload: fromJS(sort),
  };
}
