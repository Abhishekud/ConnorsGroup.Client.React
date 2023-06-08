export const SET_EDIT_PART_FIELD_VALUE_MODEL_PROPERTY = 'SET_EDIT_PART_FIELD_VALUE_MODEL_PROPERTY';

export function setEditPartFieldValueModelProperty(id, value) {
  return {
    type: SET_EDIT_PART_FIELD_VALUE_MODEL_PROPERTY,
    payload: {id: Number(id), value},
  };
}
