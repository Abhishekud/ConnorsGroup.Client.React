import {fromJS} from 'immutable';

export const FILTER_VOLUME_DRIVER_MAPPING_VALUES_LIST = 'FILTER_VOLUME_DRIVER_MAPPING_VALUES_LIST';

export function filterVolumeDriverValuesList(filter) {
  return {
    type: FILTER_VOLUME_DRIVER_MAPPING_VALUES_LIST,
    payload: fromJS(filter),
  };
}
