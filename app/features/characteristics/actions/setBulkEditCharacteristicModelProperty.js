export const SET_BULK_EDIT_CHARACTERISTIC_MODEL_PROPERTY = 'SET_BULK_EDIT_CHARACTERISTIC_MODEL_PROPERTY';

export function setBulkEditCharacteristicModelProperty(name, value, index) {
  return {
    type: SET_BULK_EDIT_CHARACTERISTIC_MODEL_PROPERTY,
    payload: {name, value, index},
  };
}
