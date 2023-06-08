export const SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_SET_VALUE = 'SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_CATEGORY_VALUE';

export function setCreateVolumeDriverMappingModelSetValue(volumeDriverMappingSetId, value) {
  return {
    type: SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_SET_VALUE,
    payload: {volumeDriverMappingSetId, value},
  };
}
