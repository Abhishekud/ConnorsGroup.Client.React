export const SET_EDIT_VOLUME_DRIVER_MODEL_PROPERTY = 'SET_EDIT_VOLUME_DRIVER_MODEL_PROPERTY';

export function setEditVolumeDriverModelProperty(name, value) {
  return {
    type: SET_EDIT_VOLUME_DRIVER_MODEL_PROPERTY,
    payload: {name, value},
  };
}
