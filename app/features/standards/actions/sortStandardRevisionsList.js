export const SORT_STANDARD_REVISIONS_LIST = 'SORT_STANDARD_REVISIONS_LIST';
import {fromJS} from 'immutable';
export function sortStandardRevisionsList(sort) {
  return {
    type: SORT_STANDARD_REVISIONS_LIST,
    payload: fromJS(sort),
  };
}
