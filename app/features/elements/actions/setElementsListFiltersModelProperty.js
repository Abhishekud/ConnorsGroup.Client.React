export const SET_ELEMENTS_LIST_FILTERS_MODEL_PROPERTY = 'SET_ELEMENTS_LIST_FILTERS_MODEL_PROPERTY';

export function setElementsListFiltersModelProperty(name, value) {
  return {
    type: SET_ELEMENTS_LIST_FILTERS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
