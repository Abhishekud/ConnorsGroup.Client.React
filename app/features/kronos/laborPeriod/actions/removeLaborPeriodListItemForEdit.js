export const REMOVE_LABOR_PERIOD_LIST_ITEM_FOR_EDIT = 'REMOVE_KRONOS_LABOR_PERIOD_LIST_ITEM_FOR_EDIT';

export function removeLaborPeriodListItemForEdit(index) {
  return {
    type: REMOVE_LABOR_PERIOD_LIST_ITEM_FOR_EDIT,
    payload: {index},
  };
}
