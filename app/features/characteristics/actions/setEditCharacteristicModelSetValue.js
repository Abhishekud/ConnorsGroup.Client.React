export const SET_EDIT_CHARACTERISTIC_MODEL_SET_VALUE = 'SET_EDIT_CHARACTERISTIC_MODEL_SET_VALUE';

export function setEditCharacteristicModelSetValue(characteristicSetId, value) {
  return {
    type: SET_EDIT_CHARACTERISTIC_MODEL_SET_VALUE,
    payload: {characteristicSetId, value},
  };
}
