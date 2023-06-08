export const SET_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT = 'SET_LABOR_PERIOD_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT';

export function setOperationHoursListItemPropertyForEdit(index, id, value) {
  return {
    type: SET_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT,
    payload: {index, id, value},
  };
}
