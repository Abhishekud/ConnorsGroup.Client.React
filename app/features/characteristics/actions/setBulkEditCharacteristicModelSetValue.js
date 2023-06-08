export const SET_BULK_EDIT_CHARACTERISTIC_MODEL_SET_VALUE = 'SET_BULK_EDIT_CHARACTERISTIC_MODEL_SET_VALUE';

export function setBulkEditCharacteristicModelSetValue(characteristicSetId, value, index, isUpdate = false) {
  return {
    type: SET_BULK_EDIT_CHARACTERISTIC_MODEL_SET_VALUE,
    payload: {characteristicSetId, value, index, isUpdate},
  };
}
