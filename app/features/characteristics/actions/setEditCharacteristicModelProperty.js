export const SET_EDIT_CHARACTERISTIC_MODEL_PROPERTY = 'SET_EDIT_CHARACTERISTIC_MODEL_PROPERTY';

export function setEditCharacteristicModelProperty(name, value) {
  return {
    type: SET_EDIT_CHARACTERISTIC_MODEL_PROPERTY,
    payload: {name, value},
  };
}
