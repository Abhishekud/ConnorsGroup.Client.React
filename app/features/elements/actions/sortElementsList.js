import {fromJS} from 'immutable';
export const SORT_ELEMENTS_LIST = 'SORT_ELEMENTS_LIST';

export function sortElementsList(sort) {
  return {
    type: SORT_ELEMENTS_LIST,
    payload: fromJS(sort),
  };
}
