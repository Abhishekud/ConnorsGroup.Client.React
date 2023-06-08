export const SET_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE = 'SET_LABOR_PERIOD_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE';

export function setOperationHoursListItemPropertyForCreate(index, id, value) {
  return {
    type: SET_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_CREATE,
    payload: {index, id, value},
  };
}
