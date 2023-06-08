export const SET_STANDARD_ITEM_MODEL_PROPERTY = 'SET_STANDARD_ITEM_MODEL_PROPERTY';

export function setStandardItemModelProperty(standardItemId, name, value) {
  return {
    type: SET_STANDARD_ITEM_MODEL_PROPERTY,
    payload: {standardItemId, name, value},
  };
}
