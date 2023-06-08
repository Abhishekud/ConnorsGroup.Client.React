export const SET_CREATE_VOLUME_DRIVER_MODEL_PROPERTY = 'SET_CREATE_VOLUME_DRIVER_MODEL_PROPERTY';

export function setCreateVolumeDriverModelProperty(name, value) {
  return {
    type: SET_CREATE_VOLUME_DRIVER_MODEL_PROPERTY,
    payload: {name, value},
  };
}
