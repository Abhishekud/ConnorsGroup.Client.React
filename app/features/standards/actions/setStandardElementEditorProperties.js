export const SET_STANDARD_ELEMENT_EDITOR_PROPERTY = 'SET_STANDARD_ELEMENT_EDITOR_PROPERTY';

export function setStandardElementEditorProperty(name, value) {
  return {
    type: SET_STANDARD_ELEMENT_EDITOR_PROPERTY,
    payload: {name, value},
  };
}
