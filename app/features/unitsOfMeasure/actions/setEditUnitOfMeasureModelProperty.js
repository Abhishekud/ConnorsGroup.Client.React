export const SET_EDIT_UNIT_OF_MEASURE_MODEL_PROPERTY = 'SET_EDIT_UNIT_OF_MEASURE_MODEL_PROPERTY';

export function setEditUnitOfMeasureModelProperty(name, value) {
  return {
    type: SET_EDIT_UNIT_OF_MEASURE_MODEL_PROPERTY,
    payload: {name, value},
  };
}
