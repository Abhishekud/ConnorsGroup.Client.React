export const SET_CREATE_CHARACTERISTIC_MODEL_PROPERTY = 'SET_CREATE_CHARACTERISTIC_MODEL_PROPERTY';

export function setCreateCharacteristicModelProperty(name, value) {
  return {
    type: SET_CREATE_CHARACTERISTIC_MODEL_PROPERTY,
    payload: {name, value},
  };
}
