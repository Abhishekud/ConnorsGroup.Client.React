export const SET_EDIT_PART_FAMILY_MODEL_PROPERTY = 'SET_EDIT_PART_FAMILY_MODEL_PROPERTY';

export function setEditPartFamilyModelProperty(name, value) {
  return {
    type: SET_EDIT_PART_FAMILY_MODEL_PROPERTY,
    payload: {name, value},
  };
}
