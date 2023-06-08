export const SORT_VOLUME_DRIVER_VALUES_LIST = 'SORT_VOLUME_DRIVER_VALUES_LIST';
import {fromJS} from 'immutable';
export function sortVolumeDriverValuesList(sort) {
  return {
    type: SORT_VOLUME_DRIVER_VALUES_LIST,
    payload: fromJS(sort),
  };
}
