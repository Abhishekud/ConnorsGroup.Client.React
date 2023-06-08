import {fromJS} from 'immutable';

export const SORT_PART_FAMILIES_LIST = 'SORT_PART_FAMILIES_LIST';

export function sortPartFamiliesList(sort) {
  return {
    type: SORT_PART_FAMILIES_LIST,
    payload: fromJS(sort),
  };
}
