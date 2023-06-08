export const SET_CREATE_PART_FIELD_VALUE_MODEL_PROPERTY = 'SET_CREATE_PART_FIELD_VALUE_MODEl_PROPERTY';

export function setCreatePartFieldValueModelProperty(id, value) {
  return {
    type: SET_CREATE_PART_FIELD_VALUE_MODEL_PROPERTY,
    payload: {id: Number(id), value},
  };
}
