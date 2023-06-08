export const SET_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE = 'SET_LABOR_PERIOD_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE';

export function setAfterCloseHoursListItemPropertyForCreate(index, id, value) {
  return {
    type: SET_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE,
    payload: {index, id, value},
  };
}
