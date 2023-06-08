export const SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY = 'SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY';

export function setStandardListBulkEditFilingFieldModelProperty(id, value) {
  return {
    type: SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY,
    payload: {id: Number(id), value: value === null ? null : Number(value)},
  };
}
