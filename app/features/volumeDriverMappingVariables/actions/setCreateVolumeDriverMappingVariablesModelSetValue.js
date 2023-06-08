export const SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_SET_VALUE = 'SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_CATEGORY_VALUE';

export function setCreateVolumeDriverMappingVariablesModelSetValue(volumeDriverMappingSetId, value) {
  return {
    type: SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_SET_VALUE,
    payload: {volumeDriverMappingSetId, value},
  };
}
