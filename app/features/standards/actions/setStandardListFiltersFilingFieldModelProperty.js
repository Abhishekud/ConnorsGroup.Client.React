export const SET_STANDARD_LIST_FILTERS_FILING_FIELD_MODEL_PROPERTY = 'SET_STANDARD_LIST_FILTERS_FILING_FIELD_MODEL_PROPERTY';

export function setStandardListFiltersFilingFieldModelProperty(id, value) {
  return {
    type: SET_STANDARD_LIST_FILTERS_FILING_FIELD_MODEL_PROPERTY,
    payload: {id: Number(id), value: value === null ? null : Number(value)},
  };
}
