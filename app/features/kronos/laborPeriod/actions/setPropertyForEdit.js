export const SET_PROPERTY_FOR_EDIT = 'SET_KRONOS_LABOR_PERIOD_PROPERTY_FOR_EDIT';

export function setPropertyForEdit(id, value) {
  return {
    type: SET_PROPERTY_FOR_EDIT,
    payload: {id, value},
  };
}

