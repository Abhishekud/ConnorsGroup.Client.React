import {fromJS} from 'immutable';

export const SORT_STANDARDS_LIST = 'SORT_STANDARDS_LIST';

export function sortStandardsList(sort) {
  return {
    type: SORT_STANDARDS_LIST,
    payload: fromJS(sort),
  };
}
