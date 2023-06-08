export const SET_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT = 'SET_LABOR_PERIOD_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT';

export function setAfterCloseHoursListItemPropertyForEdit(index, id, value) {
  return {
    type: SET_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT,
    payload: {index, id, value},
  };
}
