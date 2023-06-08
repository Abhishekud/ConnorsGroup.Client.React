export const SET_CREATE_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY = 'SET_CREATE_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY';

export function setCreateVolumeDriverMappingSetModelProperty(name, value) {
  return {
    type: SET_CREATE_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY,
    payload: {name, value},
  };
}
