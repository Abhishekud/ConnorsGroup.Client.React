export const SET_EDIT_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY = 'SET_EDIT_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY';

export function setEditVolumeDriverValueSetModelProperty(name, value, message) {
  return {
    type: SET_EDIT_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY,
    payload: {name, value, message},
  };
}
