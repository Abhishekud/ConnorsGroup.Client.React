import {fromJS} from 'immutable';

export const FILTER_PART_FIELDS_LIST = 'FILTER_PART_FIELDS_LIST';

export function filterPartFieldsList(filter) {
  return {
    type: FILTER_PART_FIELDS_LIST,
    payload: fromJS(filter),
  };
}
