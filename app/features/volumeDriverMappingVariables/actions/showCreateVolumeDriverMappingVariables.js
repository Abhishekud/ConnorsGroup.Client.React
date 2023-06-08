export const SHOW_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES = 'SHOW_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES';

export function showCreateVolumeDriverMappingVariables(departmentId) {
  return {
    type: SHOW_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES,
    payload: {departmentId},
  };
}
