export const SET_LOCATION_DEPARTMENTS_LIST_FILTERS_MODEL_PROPERTY = 'SET_LOCATION_DEPARTMENTS_LIST_FILTERS_MODEL_PROPERTY';

export function setLocationDepartmentsListFiltersModelProperty(name, value) {
  return {
    type: SET_LOCATION_DEPARTMENTS_LIST_FILTERS_MODEL_PROPERTY,
    payload: {name, value},
  };
}
