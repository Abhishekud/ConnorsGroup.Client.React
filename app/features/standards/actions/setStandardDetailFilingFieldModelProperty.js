export const SET_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY = 'SET_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY';

export function setStandardDetailFilingFieldModelProperty(id, value) {
  return {
    type: SET_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY,
    payload: {id: Number(id), value: value === null ? null : Number(value)},
  };
}
