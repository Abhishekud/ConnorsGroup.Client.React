export const SET_CREATE_CHARACTERISTIC_MODEL_SET_VALUE = 'SET_CREATE_CHARACTERISTIC_MODEL_SET_VALUE';

export function setCreateCharacteristicModelSetValue(characteristicSetId, value) {
  return {
    type: SET_CREATE_CHARACTERISTIC_MODEL_SET_VALUE,
    payload: {characteristicSetId, value},
  };
}
