export const FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST = 'FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST';
export const FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_PENDING = `${FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST}_PENDING`;
export const FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FULFILLED = `${FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST}_FULFILLED`;
export const FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_REJECTED = `${FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST}_REJECTED`;

export function filterVolumeDriverMappingVariablesList(filters) {
  return {
    type: FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST,
    payload: Promise.resolve(filters),
  };
}