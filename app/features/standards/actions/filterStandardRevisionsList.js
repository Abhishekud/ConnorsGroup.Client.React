import {fromJS} from 'immutable';
export const FILTER_STANDARD_REVISIONS_LIST = 'FILTER_STANDARD_REVISIONS_LIST';

export function filterStandardRevisionsList(filter) {
  return {
    type: FILTER_STANDARD_REVISIONS_LIST,
    payload: fromJS(filter),
  };
}
