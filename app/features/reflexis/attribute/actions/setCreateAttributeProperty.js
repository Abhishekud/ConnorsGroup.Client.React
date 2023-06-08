export const SET_CREATE_ATTRIBUTE_PROPERTY = 'REFLEXIS/ATTRIBUTES/SET_CREATE_PROPERTY';

export function setCreateAttributeProperty(name, value) {
  return {
    type: SET_CREATE_ATTRIBUTE_PROPERTY,
    payload: {name, value},
  };
}
