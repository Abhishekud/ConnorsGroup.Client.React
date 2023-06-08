export const SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST = 'SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST';
export const SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_PENDING = `${SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST}_PENDING`;
export const SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FULFILLED = `${SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST}_FULFILLED`;
export const SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_REJECTED = `${SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST}_REJECTED`;

export function sortVolumeDriverMappingVariablesList(sorts) {
  return {
    type: SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST,
    payload: Promise.resolve(sorts),
  };
}