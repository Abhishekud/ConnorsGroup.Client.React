export const SET_DUPLICATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY = 'SET_DUPLICATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY';

export function setDuplicateStandardDetailFilingFieldModelProperty(id, value) {
  return {
    type: SET_DUPLICATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY,
    payload: {id: Number(id), value: value === null ? null : Number(value)},
  };
}
