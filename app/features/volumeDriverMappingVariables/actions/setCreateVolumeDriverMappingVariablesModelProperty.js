export const SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_PROPERTY = 'SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_PROPERTY';

export function setCreateVolumeDriverMappingVariablesModelProperty(name, value) {
  return {
    type: SET_CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_MODEL_PROPERTY,
    payload: {name, value},
  };
}
