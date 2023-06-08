export const SET_CREATE_UNIT_OF_MEASURE_MODEL_PROPERTY = 'SET_CREATE_UNIT_OF_MEASURE_MODEL_PROPERTY';

export function setCreateUnitOfMeasureModelProperty(name, value) {
  return {
    type: SET_CREATE_UNIT_OF_MEASURE_MODEL_PROPERTY,
    payload: {name, value},
  };
}
