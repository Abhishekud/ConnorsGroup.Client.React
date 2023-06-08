export const SET_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT = 'SET_LABOR_PERIOD_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT';

export function setAbsoluteHoursListItemPropertyForEdit(index, id, value) {
  return {
    type: SET_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT,
    payload: {index, id, value},
  };
}
