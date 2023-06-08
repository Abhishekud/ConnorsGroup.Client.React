export const SET_CREATE_EXPORT_REQUEST_MODEL_PROPERTY = 'SET_CREATE_EXPORT_REQUEST_MODEL_PROPERTY';

export function setCreateExportRequestModelProperty(name, value) {
  return {
    type: SET_CREATE_EXPORT_REQUEST_MODEL_PROPERTY,
    payload: {name, value},
  };
}
