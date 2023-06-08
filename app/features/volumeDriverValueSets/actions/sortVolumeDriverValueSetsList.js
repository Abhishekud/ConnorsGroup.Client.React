import {fromJS} from 'immutable';

export const SORT_VOLUME_DRIVER_VALUE_SETS_LIST = 'SORT_VOLUME_DRIVER_VALUE_SETS_LIST';

export function sortVolumeDriverValueSetsList(sort) {
  return {
    type: SORT_VOLUME_DRIVER_VALUE_SETS_LIST,
    payload: fromJS(sort),
  };
}
