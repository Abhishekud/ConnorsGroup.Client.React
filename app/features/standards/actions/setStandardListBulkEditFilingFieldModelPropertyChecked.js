export const SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY_CHECKED = 'SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY_CHECKED';

export function setStandardListBulkEditFilingFieldModelPropertyChecked(id, checked) {
  return {
    type: SET_STANDARD_LIST_BULK_EDIT_FILING_FIELD_MODEL_PROPERTY_CHECKED,
    payload: {id: Number(id), checked},
  };
}
