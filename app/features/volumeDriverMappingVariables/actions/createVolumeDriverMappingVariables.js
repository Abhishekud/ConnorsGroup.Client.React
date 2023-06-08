import {http} from '../../shared/services';

export const CREATE_VOLUME_DRIVER_MAPPING_VARIABLES = 'CREATE_VOLUME_DRIVER_MAPPING_VARIABLES';
export const CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_PENDING = `${CREATE_VOLUME_DRIVER_MAPPING_VARIABLES}_PENDING`;
export const CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_FULFILLED = `${CREATE_VOLUME_DRIVER_MAPPING_VARIABLES}_FULFILLED`;
export const CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_REJECTED = `${CREATE_VOLUME_DRIVER_MAPPING_VARIABLES}_REJECTED`;

export function createVolumeDriverMappingVariables(departmentId, model) {
  return {
    type: CREATE_VOLUME_DRIVER_MAPPING_VARIABLES,
    payload: http.post('volume-driver-mapping-variables', model.set('departmentId', departmentId)),
  };
}

