export const SET_CREATE_PART_MODEL_PROPERTY = 'SET_CREATE_PART_MODEL_PROPERTY';

export function setCreatePartModelProperty(name, value) {
  return {
    type: SET_CREATE_PART_MODEL_PROPERTY,
    payload: {name, value},
  };
}
