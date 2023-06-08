export const SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY = 'SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY';

export function setCreateVolumeDriverMappingModelProperty(name, value) {
  return {
    type: SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY,
    payload: {name, value},
  };
}
