export const SET_CREATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY = 'SET_CREATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY';

export function setCreateStandardDetailFilingFieldModelProperty(id, value) {
  return {
    type: SET_CREATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY,
    payload: {id: Number(id), value: value === null ? null : Number(value)},
  };
}
