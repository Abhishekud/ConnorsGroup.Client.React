export const SET_CHARACTERISTICS_LIST_FILTERS_MODEL_PROPERTY = 'SET_CHARACTERISTICS_LIST_FILTERS_MODEL_PROPERTY';

export function setCharacteristicsListFiltersModelProperty(name, value) {
  return {
    type: SET_CHARACTERISTICS_LIST_FILTERS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
