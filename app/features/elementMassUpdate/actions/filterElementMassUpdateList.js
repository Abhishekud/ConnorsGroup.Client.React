import {fromJS} from 'immutable';
export const FILTER_ELEMENT_WHERE_USED_STANDARDS_LIST = 'FILTER_ELEMENT_WHERE_USED_STANDARDS_LIST';

export function filterElementMassUpdateList(filter) {
  return {
    type: FILTER_ELEMENT_WHERE_USED_STANDARDS_LIST,
    payload: fromJS(filter),
  };
}
