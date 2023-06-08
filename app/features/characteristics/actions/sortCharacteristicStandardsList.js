import {fromJS} from 'immutable';

export const SORT_CHARACTERISTIC_STANDARDS_MAPPING_LIST = 'SORT_CHARACTERISTIC_STANDARDS_MAPPING_LIST';

export function sortCharacteristicStandardsList(sort) {
  return {
    type: SORT_CHARACTERISTIC_STANDARDS_MAPPING_LIST,
    payload: fromJS(sort),
  };
}
