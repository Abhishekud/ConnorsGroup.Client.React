export const SET_AFTER_OPEN_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE = 'SET_LABOR_PERIOD_AFTER_OPEN_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE';

export function setAfterOpenHoursListItemPropertyForCreate(index, id, value) {
  return {
    type: SET_AFTER_OPEN_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE,
    payload: {index, id, value},
  };
}
