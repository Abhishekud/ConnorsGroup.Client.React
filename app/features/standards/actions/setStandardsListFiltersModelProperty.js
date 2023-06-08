export const SET_STANDARDS_LIST_FILTERS_MODEL_PROPERTY = 'SET_STANDARDS_LIST_FILTERS_MODEL_PROPERTY';

export function setStandardsListFiltersModelProperty(name, value) {
  return {
    type: SET_STANDARDS_LIST_FILTERS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
