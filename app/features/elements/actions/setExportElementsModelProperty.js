export const SET_EXPORT_ELEMENTS_MODEL_PROPERTY = 'SET_EXPORT_ELEMENTS_MODEL_PROPERTY';

export function setExportElementsModelProperty(name, value) {
  return {
    type: SET_EXPORT_ELEMENTS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
