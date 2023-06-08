export const SET_CREATE_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY = 'SET_CREATE_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY';

export function setCreateVolumeDriverValueSetModelProperty(name, value, message) {
  return {
    type: SET_CREATE_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY,
    payload: {name, value, message},
  };
}
