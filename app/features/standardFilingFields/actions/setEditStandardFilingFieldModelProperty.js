export const SET_EDIT_STANDARD_FILING_FIELD_MODEL_PROPERTY = 'SET_EDIT_STANDARD_FILING_FIELD_MODEL_PROPERTY';

export function setEditStandardFilingFieldModelProperty(name, value) {
  return {
    type: SET_EDIT_STANDARD_FILING_FIELD_MODEL_PROPERTY,
    payload: {name, value},
  };
}
