import {fromJS} from 'immutable';

export const FILTER_PART_FAMILIES_LIST = 'FILTER_PART_FAMILIES_LIST';

export function filterPartFamiliesList(filter) {
  return {
    type: FILTER_PART_FAMILIES_LIST,
    payload: fromJS(filter),
  };
}
