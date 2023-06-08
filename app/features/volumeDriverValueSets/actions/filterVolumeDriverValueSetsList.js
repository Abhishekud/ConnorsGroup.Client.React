import {fromJS} from 'immutable';

export const FILTER_VOLUME_DRIVER_VALUE_SETS_LIST = 'FILTER_VOLUME_DRIVER_VALUE_SETS_LIST';

export function filterVolumeDriverValueSetsList(filter) {
  return {
    type: FILTER_VOLUME_DRIVER_VALUE_SETS_LIST,
    payload: fromJS(filter),
  };
}
