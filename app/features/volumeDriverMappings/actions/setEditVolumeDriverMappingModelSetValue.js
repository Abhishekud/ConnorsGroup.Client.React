export const SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_SET_VALUE = 'SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_SET_VALUE';

export function setEditVolumeDriverMappingModelSetValue(volumeDriverMappingSetId, value) {
  return {
    type: SET_EDIT_VOLUME_DRIVER_MAPPING_MODEL_SET_VALUE,
    payload: {volumeDriverMappingSetId, value},
  };
}
