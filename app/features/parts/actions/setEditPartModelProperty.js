export const SET_EDIT_PART_MODEL_PROPERTY = 'SET_EDIT_PART_MODEL_PROPERTY';

export function setEditPartModelProperty(name, value) {
  return {
    type: SET_EDIT_PART_MODEL_PROPERTY,
    payload: {name, value},
  };
}
