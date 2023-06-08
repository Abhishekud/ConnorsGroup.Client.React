export const SET_EDIT_ATTRIBUTE_PROPERTY = 'REFLEXIS/ATTRIBUTES/SET_EDIT_PROPERTY';

export function setEditAttributeProperty(name, value) {
  return {
    type: SET_EDIT_ATTRIBUTE_PROPERTY,
    payload: {name, value},
  };
}

