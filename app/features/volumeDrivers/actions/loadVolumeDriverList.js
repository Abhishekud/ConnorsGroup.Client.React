import {http} from '../../shared/services';

export const LOAD_VOLUME_DRIVERS_LIST = 'LOAD_VOLUME_DRIVERS_LIST';
export const LOAD_VOLUME_DRIVERS_LIST_PENDING = `${LOAD_VOLUME_DRIVERS_LIST}_PENDING`;
export const LOAD_VOLUME_DRIVERS_LIST_FULFILLED = `${LOAD_VOLUME_DRIVERS_LIST}_FULFILLED`;
export const LOAD_VOLUME_DRIVERS_LIST_REJECTED = `${LOAD_VOLUME_DRIVERS_LIST}_REJECTED`;

export function loadVolumeDriversList(filtersModel) {
  return {
    type: LOAD_VOLUME_DRIVERS_LIST,
    payload: http.post('volume-drivers/list', filtersModel),
  };
}
