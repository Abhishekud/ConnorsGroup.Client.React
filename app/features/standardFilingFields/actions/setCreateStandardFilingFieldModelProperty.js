export const SET_CREATE_STANDARD_FILING_FIELD_MODEL_PROPERTY = 'SET_CREATE_STANDARD_FILING_FIELD_MODEL_PROPERTY';

export function setCreateStandardFilingFieldModelProperty(name, value) {
  return {
    type: SET_CREATE_STANDARD_FILING_FIELD_MODEL_PROPERTY,
    payload: {name, value},
  };
}
