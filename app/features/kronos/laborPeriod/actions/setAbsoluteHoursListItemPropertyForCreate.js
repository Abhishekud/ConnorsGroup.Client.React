export const SET_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE = 'SET_LABOR_PERIOD_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE';

export function setAbsoluteHoursListItemPropertyForCreate(index, id, value) {
  return {
    type: SET_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE,
    payload: {index, id, value},
  };
}
