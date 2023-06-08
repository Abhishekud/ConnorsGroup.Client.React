export const SET_PROMOTE_TO_LIST_ELEMENT_MODEL_PROPERTY = 'SET_PROMOTE_TO_LIST_ELEMENT_MODEL_PROPERTY';

export function setPromoteToListElementModelProperty(name, value) {
  return {
    type: SET_PROMOTE_TO_LIST_ELEMENT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
