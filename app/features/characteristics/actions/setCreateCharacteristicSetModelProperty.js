export const SET_CREATE_CHARACTERISTIC_SET_MODEL_PROPERTY = 'SET_CREATE_CHARACTERISTIC_SET_MODEL_PROPERTY';

export function setCreateCharacteristicSetModelProperty(name, value) {
  return {
    type: SET_CREATE_CHARACTERISTIC_SET_MODEL_PROPERTY,
    payload: {name, value},
  };
}
