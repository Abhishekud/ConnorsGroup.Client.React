import {http} from '../../shared/services';

export const CREATE_VOLUME_DRIVER_MAPPING_SET = 'CREATE_VOLUME_DRIVER_MAPPING_SET';
export const CREATE_VOLUME_DRIVER_MAPPING_SET_PENDING = `${CREATE_VOLUME_DRIVER_MAPPING_SET}_PENDING`;
export const CREATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED = `${CREATE_VOLUME_DRIVER_MAPPING_SET}_FULFILLED`;
export const CREATE_VOLUME_DRIVER_MAPPING_SET_REJECTED = `${CREATE_VOLUME_DRIVER_MAPPING_SET}_REJECTED`;

export function createVolumeDriverMappingSet(departmentId, model) {
  return {
    type: CREATE_VOLUME_DRIVER_MAPPING_SET,
    payload: http.post('volume-driver-mapping-sets', model.set('departmentId', departmentId)),
  };
}
