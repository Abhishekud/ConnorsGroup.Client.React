import {fromJS} from 'immutable';

export const SORT_LOCATION_MAPPING_LIST = 'SORT_LOCATION_MAPPING_LIST';

export function sortLocationMappingList(sort) {
  return {
    type: SORT_LOCATION_MAPPING_LIST,
    payload: fromJS(sort),
  };
}
