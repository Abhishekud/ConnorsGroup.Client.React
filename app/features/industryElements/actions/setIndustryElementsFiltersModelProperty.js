export const SET_INDUSTRY_ELEMENTS_LIST_FILTERS_MODEL_PROPERTY = 'SET_INDUSTRY_ELEMENTS_LIST_FILTERS_MODEL_PROPERTY';

export function setIndustryElementsListFiltersModelProperty(name, value) {
  return {
    type: SET_INDUSTRY_ELEMENTS_LIST_FILTERS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
