export const SET_EDIT_PART_FIELD_MODEL_PROPERTY = 'SET_EDIT_PART_FIELD_MODEL_PROPERTY';

export function setEditPartFieldModelProperty(name, value) {
  return {
    type: SET_EDIT_PART_FIELD_MODEL_PROPERTY,
    payload: {name, value},
  };
}
