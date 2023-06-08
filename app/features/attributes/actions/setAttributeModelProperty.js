export const SET_ATTRIBUTE_MODEL_PROPERTY = 'SET_ATTRIBUTE_MODEL_PROPERTY';

export function setAttributeModelProperty(attributeId, name, value) {
  return {
    type: SET_ATTRIBUTE_MODEL_PROPERTY,
    payload: {attributeId, name, value},
  };
}
