import {fromJS} from 'immutable';

export const SORT_PART_FIELDS_LIST = 'SORT_PART_FIELDS_LIST';

export function sortPartFieldsList(sort) {
  return {
    type: SORT_PART_FIELDS_LIST,
    payload: fromJS(sort),
  };
}
