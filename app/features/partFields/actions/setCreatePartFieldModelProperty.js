export const SET_CREATE_PART_FIELD_MODEL_PROPERTY = 'SET_CREATE_PART_FIELD_MODEL_PROPERTY';

export function setCreatePartFieldModelProperty(name, value) {
  return {
    type: SET_CREATE_PART_FIELD_MODEL_PROPERTY,
    payload: {name, value},
  };
}
