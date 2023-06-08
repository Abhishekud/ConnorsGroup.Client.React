import {http} from '../../shared/services';

export const CREATE_VOLUME_DRIVER_MAPPING = 'CREATE_VOLUME_DRIVER_MAPPING';
export const CREATE_VOLUME_DRIVER_MAPPING_PENDING = `${CREATE_VOLUME_DRIVER_MAPPING}_PENDING`;
export const CREATE_VOLUME_DRIVER_MAPPING_FULFILLED = `${CREATE_VOLUME_DRIVER_MAPPING}_FULFILLED`;
export const CREATE_VOLUME_DRIVER_MAPPING_REJECTED = `${CREATE_VOLUME_DRIVER_MAPPING}_REJECTED`;

export function createVolumeDriverMapping(model) {
  return {
    type: CREATE_VOLUME_DRIVER_MAPPING,
    payload: http.post('volume-driver-mappings', model),
  };
}
