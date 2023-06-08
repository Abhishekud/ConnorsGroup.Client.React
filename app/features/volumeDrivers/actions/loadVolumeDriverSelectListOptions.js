import {http} from '../../shared/services';

export const LOAD_VOLUME_DRIVER_SELECT_LIST_OPTIONS = 'LOAD_VOLUME_DRIVER_SELECT_LIST_OPTIONS';
export const LOAD_VOLUME_DRIVER_SELECT_LIST_OPTIONS_FULFILLED = `${LOAD_VOLUME_DRIVER_SELECT_LIST_OPTIONS}_FULFILLED`;

export function loadVolumeDriverSelectListOptions() {
  return {
    type: LOAD_VOLUME_DRIVER_SELECT_LIST_OPTIONS,
    payload: http.get('volume-drivers/select-list-options'),
  };
}
