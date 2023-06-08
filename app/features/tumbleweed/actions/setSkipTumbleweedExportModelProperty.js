export const SET_SKIP_TUMBLEWEED_EXPORT_MODEL_PROPERTY = 'SET_SKIP_TUMBLEWEED_EXPORT_MODEL_PROPERTY';

export function setSkipTumbleweedExportModelProperty(name, value) {
  return {
    type: SET_SKIP_TUMBLEWEED_EXPORT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
