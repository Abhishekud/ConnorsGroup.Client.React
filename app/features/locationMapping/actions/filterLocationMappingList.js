import {fromJS} from 'immutable';

export const FILTER_LOCATION_MAPPING_LIST = 'FILTER_LOCATION_MAPPING_LIST';

export function filterLocationMappingList(filter) {
  return {
    type: FILTER_LOCATION_MAPPING_LIST,
    payload: fromJS(filter),
  };
}
