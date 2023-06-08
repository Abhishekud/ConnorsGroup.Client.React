export const SET_CHARACTERISTIC_SET_MODEL_PROPERTY = 'SET_CHARACTERISTIC_SET_MODEL_PROPERTY';

export function setCharacteristicSetModelProperty(characteristicSetId, name, value) {
  return {
    type: SET_CHARACTERISTIC_SET_MODEL_PROPERTY,
    payload: {characteristicSetId, name, value},
  };
}
