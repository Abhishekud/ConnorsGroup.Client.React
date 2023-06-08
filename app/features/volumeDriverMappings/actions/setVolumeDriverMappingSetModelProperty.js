export const SET_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY = 'SET_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY';

export function setVolumeDriverMappingSetModelProperty(volumeDriverMappingSetId, name, value) {
  return {
    type: SET_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY,
    payload: {volumeDriverMappingSetId, name, value},
  };
}
